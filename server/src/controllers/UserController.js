const User = require("../models/User");
const { delCache } = require("../utils/cache");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    // Admin: return all users.
    if (req.user && req.user.role === "admin") {
      const users = await User.find();
      return res.status(200).json(users);
    }

    // Accountant: see themselves, users they created, and owners of companies they are accountant for
    if (req.user && req.user.role === "accountant") {
      const Company = require("../models/Company");
      const companies = await Company.find({ accountant: req.user._id });
      const ownerIds = companies.map(c => {
        if (!c.owner) return null;
        if (typeof c.owner === "string") return c.owner;
        // if populated, try _id, else Object
        if (typeof c.owner === "object" && c.owner._id) return c.owner._id.toString();
        return null;
      });
      // Users created by this accountant (direct)
      const createdUsers = await User.find({ createdBy: req.user._id });
      // Defensive: only map .toString() if present
      const createdByIds = Array.isArray(createdUsers)
        ? createdUsers
            .filter(u => u && u._id !== undefined && u._id !== null)
            .map(u => typeof u._id === "string" ? u._id : u._id.toString())
        : [];
      // Always include self (string only)
      const selfId =
        req.user && req.user._id
          ? typeof req.user._id === "string"
            ? req.user._id
            : req.user._id.toString()
          : undefined;
      const safeOwnerIds = (ownerIds || []).filter(id => !!id && typeof id === "string");
      const idsToReturn = []
        .concat(selfId ? [selfId] : [])
        .concat(createdByIds)
        .concat(safeOwnerIds);
      // Remove duplicates and filter out anything not a valid string ObjectId
      const uniqueIds = Array.from(
        new Set(
          (Array.isArray(idsToReturn) ? idsToReturn : []).filter(
            id =>
              typeof id === "string" &&
              id.match(/^[a-fA-F0-9]{24}$/)
          )
        )
      );
      // Defensive debugging output (remove in production)
      console.log("getAllUsers debug -- req.user._id:", req.user._id);
      console.log("getAllUsers debug -- createdByIds:", createdByIds);
      console.log("getAllUsers debug -- ownerIds:", ownerIds);
      console.log("getAllUsers debug -- idsToReturn pre-filter:", idsToReturn);
      console.log("getAllUsers debug -- uniqueIds (final):", uniqueIds);

      if (!uniqueIds || !Array.isArray(uniqueIds) || uniqueIds.length === 0) {
        return res.status(200).json([]);
      }
      // Only include owners and self (remove any admins/accountants that aren't self)
      const users = await User.find({ _id: { $in: uniqueIds } });
      const filteredUsers = users.filter(u =>
        u.role === "owner" ||
        (u.role === "accountant" && u._id.equals(req.user._id))
      );
      return res.status(200).json(filteredUsers);
    }

    // All else: forbidden
    res.status(403).json({ message: "Forbidden: Only admin or accountant can list users" });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "User not found" });
    // Permission check
    if (req.user.role === "admin") {
      // admin can see any user
      return res.status(200).json(user);
    } else if (req.user.role === "accountant") {
      // can see self, users they created, and owners of their companies
      if (
        user._id.equals(req.user._id) ||
        (user.createdBy && user.createdBy.equals(req.user._id))
      ) {
        return res.status(200).json(user);
      }
      const Company = require("../models/Company");
      const companies = await Company.find({ accountant: req.user._id });
      const ownerIds = companies.map(c =>
        typeof c.owner === "string" ? c.owner : (c.owner?._id || "")
      );
      if (ownerIds.map(String).includes(user._id.toString())) {
        return res.status(200).json(user);
      }
      return res.status(403).json({ message: "Forbidden" });
    } else if (req.user.role === "owner") {
      // Owners can see only themselves OR their accountant(s)
      if (user._id.equals(req.user._id)) {
        return res.status(200).json(user);
      }
      // allow owner to see accountant(s) of their company
      if (user.role === "accountant") {
        const Company = require("../models/Company");
        const company = await Company.findOne({ owner: req.user._id, accountant: user._id });
        if (company) {
          return res.status(200).json(user);
        }
      }
      return res.status(403).json({ message: "Forbidden" });
    }
    res.status(403).json({ message: "Forbidden" });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create new user
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  console.log("requestion create of user from controller");
  
  try {
    let { name, email, role, password, profile_pic } = req.body; // Add profile_pic
    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password is required (min 6 chars)" });
    }
    // Role restriction
    if (req.user.role === 'admin') {
      if (!['admin', 'accountant', 'owner'].includes(role)) {
        return res.status(400).json({ message: "Invalid role. Admin may create admin, accountant, or owner." });
      }
    } else if (req.user.role === 'accountant') {
      // Accountant may only create owner
      if (role !== 'owner') {
        return res.status(403).json({ message: "Accountant can only create users with role 'owner'." });
      }
    } else {
      return res.status(403).json({ message: "Only admin or accountant may create users." });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      role,
      passwordHash,
      profile_pic, // Add profile_pic
      createdBy: req.user._id
    });
    await user.save();
    // Invalidate cache
    await delCache(/^users:/);
    await delCache(/^companies:/);
    // Exclude passwordHash in response
    const userObj = user.toObject();
    delete userObj.passwordHash;
    res.status(201).json(userObj);
  } catch (err) {
    console.error("Error creating user:", err, err.message );
    res.status(400).json({ message: "Invalid request", error: err.message });
  }
};

// Update user by ID
const Company = require("../models/Company");

const updateUser = async (req, res) => {
  try {
    const update = req.body;
    const userId = req.params.id;
    const target = await User.findById(userId);
    if (!target) return res.status(404).json({ message: "User not found" });

    // Permission: admin all, accountant only users they created/owners of their companies/self, owner only self
    if (req.user.role === "admin" ||
      (req.user.role === "accountant" && (
        target._id.equals(req.user._id) ||
        (target.createdBy && target.createdBy.equals(req.user._id)) ||
        ((await Company.findOne({ accountant: req.user._id, owner: target._id })))
      )) ||
      (req.user.role === "owner" && target._id.equals(req.user._id))) {
      // Allowed
      // Security: accountant may only change certain fields
      if (req.user.role === "accountant" && !(
        target.createdBy && target.createdBy.equals(req.user._id)
      ) && !target._id.equals(req.user._id)) {
        return res.status(403).json({ message: "Forbidden: Accountants can only edit users they created or themselves" });
      }
      // Prevent role escalation by accountant/owner
      if (req.user.role !== "admin" && update.role && update.role !== target.role) {
        return res.status(403).json({ message: "Only admin can change user roles" });
      }
      Object.assign(target, update);
      await target.save();

      // Invalidate cache
      await delCache(/^users:/);
      await delCache(new RegExp('^users_id:/api/users/' + userId + '$'));
      await delCache(/^companies:/);

      res.status(200).json(target);
    } else {
      return res.status(403).json({ message: "Forbidden" });
    }
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(400).json({ message: "Invalid request", error: err.message });
  }
};

// Update user's Firebase token (Admin only)
const updateUserFirebaseToken = async (req, res) => {
  try {
    const { userId } = req.params;
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Firebase token is required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the firebase token
    user.firebaseToken = token;
    await user.save();

    // Invalidate cache for this user
    await delCache(`users_${user._id}`);
    await delCache('users');

    res.status(200).json({ 
      message: 'Firebase token updated successfully',
      userId: user._id,
      hasToken: !!token
    });
  } catch (error) {
    console.error('Error updating Firebase token:', error);
    res.status(500).json({ message: 'Server error while updating Firebase token' });
  }
};

// Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
      return res.status(404).json({ message: "User not found" });
    res.status(204).send();
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserFirebaseToken,
  deleteUser,
};