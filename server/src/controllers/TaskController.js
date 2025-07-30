// Task controller, CommonJS, JavaScript-only

const Task = require('../models/Task');
const Document = require('../models/Document');
const User = require('../models/User');
const Company = require('../models/Company');
const { delCache } = require("../utils/cache");

// Helper function to emit task notifications
const emitTaskNotification = (io, task, eventType, userId) => {
  if (io) {
    // Emit to specific user if provided
    if (userId) {
      io.to(`user_${userId}`).emit('taskNotification', {
        task: task.toObject ? task.toObject() : task,
        eventType,
        timestamp: new Date()
      });
    } else {
      // Emit to both creator and assignee
      io.to(`user_${task.createdBy}`).emit('taskNotification', {
        task: task.toObject ? task.toObject() : task,
        eventType,
        timestamp: new Date()
      });
      
      io.to(`user_${task.assignedTo}`).emit('taskNotification', {
        task: task.toObject ? task.toObject() : task,
        eventType,
        timestamp: new Date()
      });
    }
  }
};

// Get all tasks with filtering
exports.getAllTasks = async (req, res) => {
  try {
    const { status, assignedTo, createdBy, company } = req.query;
    let filter = {};
    
    // Apply filters
    if (status) filter.status = status;
    if (assignedTo) filter.assignedTo = assignedTo;
    if (createdBy) filter.createdBy = createdBy;
    if (company) filter.company = company;
    
    // Role-based filtering
    if (req.user.role === 'accountant') {
      // Accountants see tasks they created or tasks assigned to their clients
      const companies = await Company.find({ accountant: req.user._id });
      const clientIds = companies.map(c => c.owner);
      filter.$or = [
        { createdBy: req.user._id },
        { assignedTo: { $in: clientIds } }
      ];
    } else if (req.user.role === 'owner') {
      // Owners see tasks assigned to them
      filter.assignedTo = req.user._id;
    } else if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    const tasks = await Task.find(filter)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('company', 'name');
    
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// Get task by id with permission check
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('createdBy', 'name email profile_pic')
      .populate('assignedTo', 'name email profile_pic')
      .populate('company', 'name');
    
    if (!task) return res.status(404).json({ error: 'Task not found' });
    
    // Permission check
    if (req.user.role === 'accountant') {
      // Check if user created the task or if it's assigned to their client
      const company = await Company.findOne({
        $and: [
          { accountant: req.user._id },
          { owner: task.assignedTo }
        ]
      });
      
      if (!task.createdBy.equals(req.user._id) && !company) {
        return res.status(403).json({ error: 'Forbidden' });
      }
    } else if (req.user.role === 'owner') {
      // Check if task is assigned to this user
      if (!task.assignedTo.equals(req.user._id)) {
        return res.status(403).json({ error: 'Forbidden' });
      }
    } else if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    // Get associated documents and populate the owner field
    const documents = await Document.find({ task: task._id }).populate('owner', 'name email profile_pic');
    
    // Map documents to match the frontend TaskDocument interface
    const formattedDocuments = documents.map(doc => ({
      ...doc.toObject(),
      uploadedBy: doc.owner, // Map 'owner' to 'uploadedBy'
    }));
    
    res.json({ ...task.toObject(), documents: formattedDocuments });
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
};

// Create new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, type, assignedTo, company, deadline, priority, requiredFileTypes, maxFileSize, allowMultipleFiles } = req.body;
    
    // Validate required fields
    if (!title || !description || !type || !assignedTo || !company) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Verify that assigned user exists and is an owner
    const assignedUser = await User.findById(assignedTo);
    if (!assignedUser || assignedUser.role !== 'owner') {
      return res.status(400).json({ error: 'Assigned user must be an owner' });
    }
    
    // Verify that company exists and user has permission
    const companyDoc = await Company.findById(company);
    if (!companyDoc) {
      return res.status(400).json({ error: 'Company not found' });
    }
    
    if (req.user.role === 'accountant' && !companyDoc.accountant.equals(req.user._id)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    // Create task
    const task = new Task({
      title,
      description,
      type,
      createdBy: req.user._id,
      assignedTo,
      company,
      deadline,
      priority,
      requiredFileTypes,
      maxFileSize,
      allowMultipleFiles,
      status: 'pending'
    });
    
    await task.save();
    
    // Populate for response
    await task.populate('createdBy', 'name email');
    await task.populate('assignedTo', 'name email');
    await task.populate('company', 'name');
    
    // Emit notification
    const io = req.app.get('io');
    emitTaskNotification(io, task, 'created');
    
    // Invalidate cache
    await delCache(/^tasks:/);
    
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(400).json({ error: 'Failed to create task', details: error.message });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    
    // Permission check
    if (req.user.role === 'accountant') {
      // Accountants can only update tasks they created
      if (!task.createdBy.equals(req.user._id)) {
        return res.status(403).json({ error: 'Forbidden' });
      }
    } else if (req.user.role === 'owner') {
      // Owners can only update status and add notes to tasks assigned to them
      if (!task.assignedTo.equals(req.user._id)) {
        return res.status(403).json({ error: 'Forbidden' });
      }
      
      // Only allow updating specific fields for owners
      const allowedUpdates = ['status', 'clientNotes'];
      const updates = {};
      
      for (const key of allowedUpdates) {
        if (req.body[key] !== undefined) {
          updates[key] = req.body[key];
        }
      }
      
      // Handle status transitions
      if (updates.status) {
        // Set timestamps based on status
        if (updates.status === 'submitted') {
          updates.submittedAt = new Date();
        } else if (updates.status === 'completed') {
          updates.completedAt = new Date();
        } else if (updates.status === 'under_review') {
          updates.reviewedAt = new Date();
        }
      }
      
      Object.assign(task, updates);
    } else if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    } else {
      // Admins can update all fields
      Object.assign(task, req.body);
    }
    
    // Validate assignedTo and company
    if (req.body.assignedTo) {
      const assignedUser = await User.findById(req.body.assignedTo);
      if (!assignedUser || assignedUser.role !== 'owner') {
        return res.status(400).json({ error: 'Assigned user must be an owner' });
      }
      task.assignedTo = req.body.assignedTo;
    }
    
    if (req.body.company) {
      const companyDoc = await Company.findById(req.body.company);
      if (!companyDoc) {
        return res.status(400).json({ error: 'Company not found' });
      }
      task.company = req.body.company;
    }
    
    await task.save();
    
    // Populate for response
    await task.populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('company', 'name');
    
    // Emit notification
    const io = req.app.get('io');
    emitTaskNotification(io, task, 'updated');
    
    // Invalidate cache
    await delCache(/^tasks:/);
    await delCache(new RegExp(`^tasks_id:${req.params.id}$`));
    
    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(400).json({ error: 'Failed to update task', details: error.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    
    // Permission check
    if (req.user.role === 'accountant') {
      // Accountants can only delete tasks they created
      if (!task.createdBy || typeof task.createdBy.equals !== 'function') {
        return res.status(500).json({ error: 'Task is missing createdBy or it is not a valid ObjectId' });
      }
      if (!task.createdBy.equals(req.user._id)) {
        return res.status(403).json({ error: 'Forbidden' });
      }
    } else if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    await task.remove();
    
    // Emit notification
    const io = req.app.get('io');
    emitTaskNotification(io, task, 'deleted');
    
    // Invalidate cache
    await delCache(/^tasks:/);
    await delCache(new RegExp(`^tasks_id:${req.params.id}$`));
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(400).json({ error: 'Failed to delete task' });
  }
};

// Get tasks for a specific user
exports.getUserTasks = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.query;
    
    // Permission check
    if (req.user.role === 'owner' && req.user._id.toString() !== userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    if (req.user.role === 'accountant') {
      // Check if user is their client
      const company = await Company.findOne({
        $and: [
          { accountant: req.user._id },
          { owner: userId }
        ]
      });
      
      if (!company) {
        return res.status(403).json({ error: 'Forbidden' });
      }
    }
    
    let filter = { $or: [{ createdBy: userId }, { assignedTo: userId }] };
    if (status) filter.status = status;
    
    const tasks = await Task.find(filter)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('company', 'name');
    
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching user tasks:', error);
    res.status(500).json({ error: 'Failed to fetch user tasks' });
  }
};

// Submit task (for clients)
exports.submitTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { clientNotes } = req.body;
    
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    
    // Permission check - only assigned user can submit
    if (!task.assignedTo.equals(req.user._id)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    // Update task
    task.status = 'submitted';
    task.submittedAt = new Date();
    if (clientNotes) task.clientNotes = clientNotes;
    
    await task.save();
    
    // Populate for response
    await task.populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('company', 'name');
    
    // Emit notification to creator
    const io = req.app.get('io');
    emitTaskNotification(io, task, 'submitted', task.createdBy);
    
    // Invalidate cache
    await delCache(/^tasks:/);
    await delCache(new RegExp(`^tasks_id:${taskId}$`));
    
    res.json(task);
  } catch (error) {
    console.error('Error submitting task:', error);
    res.status(400).json({ error: 'Failed to submit task', details: error.message });
  }
};

// Review task (for accountants)
exports.reviewTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status, reviewNotes } = req.body; // status: 'completed' or 'rejected'
    
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    
    // Permission check - only creator can review
    if (!task.createdBy.equals(req.user._id)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    // Validate status
    if (!['completed', 'rejected', 'under_review'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    // Update task
    task.status = status;
    task.reviewNotes = reviewNotes;
    task.reviewedAt = new Date();
    
    if (status === 'completed') {
      task.completedAt = new Date();
    }
    
    await task.save();
    
    // Populate for response
    await task.populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('company', 'name');
    
    // Emit notification to assignee
    const io = req.app.get('io');
    emitTaskNotification(io, task, 'reviewed', task.assignedTo);
    
    // Invalidate cache
    await delCache(/^tasks:/);
    await delCache(new RegExp(`^tasks_id:${taskId}$`));
    
    res.json(task);
  } catch (error) {
    console.error('Error reviewing task:', error);
    res.status(400).json({ error: 'Failed to review task', details: error.message });
  }
};