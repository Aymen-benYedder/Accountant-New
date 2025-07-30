// Document controller, CommonJS, JavaScript-only

const Document = require('../models/Document');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Get all documents
exports.getAllDocuments = async (req, res) => {
  try {
    // Build query object: filter by company if provided
    const query = {};
    if (req.query.company) {
      // Strictly match ObjectId for company to avoid leaks!
      query.company = new mongoose.Types.ObjectId(req.query.company);
    }
    // You can extend for category, owner etc.

    let docs = await Document.find(query)
      .populate("owner", "name email")
      .populate("company", "name tin");
      
    // Map the documents to include a 'name' field from 'originalname'
    docs = docs.map(doc => ({
      ...doc.toObject(),
      name: doc.originalname
    }));
      
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
};

// Get document by id
exports.getDocumentById = async (req, res) => {
  try {
    let doc = await Document.findById(req.params.id)
      .populate("owner", "name email")
      .populate("company", "name tin");
    if (!doc) return res.status(404).json({ error: 'Document not found' });
    
    // Convert to object and add name field
    const docObj = doc.toObject();
    docObj.name = doc.originalname;
    
    res.json(docObj);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch document' });
  }
};

// Create document
exports.createDocument = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Authentication required" });
    }
    if (!req.body.company || !req.body.category) {
      return res.status(400).json({ error: "Company and category are required for document." });
    }
    if (!req.file) {
      return res.status(400).json({ error: "File (any type) is required." });
    }

    // Only admin or owner of the company can upload
    const Company = require("../models/Company");
    const company = await Company.findById(req.body.company);
    if (!company) {
      return res.status(404).json({ error: "Company not found." });
    }
    // Admin check (assuming req.user.role exists)
    const isAdmin = req.user.role === "admin";
    const isOwner =
      company.owner &&
      (company.owner.toString() === req.user.id.toString());
    // Accountant check
    const isAccountant =
      req.user.role === "accountant" &&
      company.accountant &&
      (company.accountant.toString() === req.user.id.toString());

    if (!isAdmin && !isOwner && !isAccountant) {
      return res.status(403).json({ error: "Only admin, owner, or assigned accountant can upload documents." });
    }

    const doc = new Document({
      company: req.body.company,
      category: req.body.category,
      description: req.body.description || "",
      owner: req.user.id,
      filename: req.file.filename,
      originalname: req.file.originalname,
      path: "/uploads/company-documents/" + req.file.filename,
      mimetype: req.file.mimetype,
      size: req.file.size,
      // Add task reference if provided
      task: req.body.task || null,
    });
    await doc.save();
    const populatedDoc = await Document.findById(doc._id)
      .populate("owner", "name email")
      .populate("company", "name tin");
      
    // Convert to object and add name field
    const responseDoc = populatedDoc.toObject();
    responseDoc.name = populatedDoc.originalname;
    
    res.status(201).json(responseDoc);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create document' });
  }
};

// Get documents for a specific task
exports.getTaskDocuments = async (req, res) => {
  try {
    const { taskId } = req.params;
    
    // Validate taskId
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }
    
    // Get documents for this task
    const docs = await Document.find({ task: taskId })
      .populate("owner", "name email")
      .populate("company", "name tin");
      
    // Map the documents to include a 'name' field from 'originalname'
    const mappedDocs = docs.map(doc => ({
      ...doc.toObject(),
      name: doc.originalname
    }));
      
    res.json(mappedDocs);
  } catch (error) {
    console.error('Error fetching task documents:', error);
    res.status(500).json({ error: 'Failed to fetch task documents' });
  }
};

// Update document
exports.updateDocument = async (req, res) => {
  try {
    const doc = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("owner", "name email")
      .populate("company", "name tin");
    if (!doc) return res.status(404).json({ error: 'Document not found' });
    res.json(doc);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update document' });
  }
};

// Download document file
exports.downloadDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Check permissions (similar to create/update)
    const Company = require("../models/Company");
    const company = await Company.findById(doc.company);
    if (!company) {
      return res.status(404).json({ error: "Company not found." });
    }

    const isAdmin = req.user.role === "admin";
    const isOwner = company.owner && company.owner.toString() === req.user.id.toString();
    const isAccountant = 
      req.user.role === "accountant" && 
      company.accountant && 
      company.accountant.toString() === req.user.id.toString();

    if (!isAdmin && !isOwner && !isAccountant) {
      return res.status(403).json({ error: "Not authorized to download this document" });
    }

    const filePath = path.join(__dirname, '../../public', doc.path);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      res.setHeader('Content-Type', 'application/json');
      return res.status(404).json({ error: 'File not found on server' });
    }

    // Set headers for file download
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(doc.originalname)}"`);
    res.setHeader('Content-Type', doc.mimetype);
    res.setHeader('Content-Length', doc.size);
    
    // Stream the file
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
    
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Failed to download document' });
  }
};

// Delete document
exports.deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Document not found' });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete document' });
  }
};