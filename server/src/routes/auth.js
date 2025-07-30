const express = require("express");
const jwtAuth = require("../auth/jwtAuth");
const User = require("../models/User");
const router = express.Router();

// GET /auth/me - get current logged-in user info (for frontend session/user hydration)
router.get("/me", jwtAuth, async (req, res) => {
 try {
   if (!req.user) return res.status(401).json({ error: "Not authenticated" });
   // Find user by id and return relevant fields
   const user = await User.findById(req.user.id || req.user._id || req.user.sub).select("_id name email role profile_pic");
   if (!user) return res.status(404).json({ error: "User not found" });
   // Return consistent structure with login endpoint
   res.json({
     user: {
       id: user._id,
       name: user.name,
       email: user.email,
       role: user.role,
       profile_pic: user.profile_pic
     }
   });
 } catch (err) {
   res.status(500).json({ error: "Unable to fetch user" });
 }
});

// ... rest of your code below ...
require('dotenv').config();
// Authentication routes, CommonJS, JavaScript-only

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const User = require('../models/User'); <-- Already imported above

// (Only one router declaration at top)

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: 'Email already in use' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, passwordHash, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// Logout (should be called by frontend with valid JWT)
router.post('/logout', async (req, res) => {
  try {
    // Extract userId from JWT (from Authorization header)
    const token = req.headers.authorization?.replace("Bearer ", "");
    let userId = null;
    if (token) {
      try {
        const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
        const decoded = jwt.verify(token, JWT_SECRET);
        userId = decoded.id || decoded._id || decoded.sub;
      } catch (e) {
        return res.status(401).json({ message: 'Invalid token' });
      }
    }
    if (!userId) return res.status(400).json({ message: 'No user found for token' });

    // Mark user offline in DB
    await User.findByIdAndUpdate(userId, { online: false });
    res.json({ message: "Logged out and set offline." });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    const jwtPayload = { id: user._id, name: user.name, email: user.email, role: user.role };
    console.log('Signing JWT with payload:', jwtPayload);
    const token = jwt.sign(
      jwtPayload,
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '4h' }
    );
    // Set online: true on login and log details
    console.log("[AUTH] Attempting to set online: true for user._id:", user._id);
    const before = await User.findById(user._id);
    console.log("[AUTH] User doc before update:", before);
    try {
      const updateResult = await User.findByIdAndUpdate(user._id, { online: true }, { new: true });
      console.log("[AUTH] Set user online. Updated doc (after):", updateResult);
    } catch (err) {
      console.error("[AUTH] Error setting user online (login):", err);
    }
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, profile_pic: user.profile_pic } });
  } catch (err) {
    res.status(500).json({
  message: 'Server error',
  error: err.message || err.toString(),
  stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined
});
  }
});

// POST /auth/verify-password
// Requires: { password }
// Authenticated route. Checks if password matches current user.
router.post('/verify-password', jwtAuth, async (req, res) => {
  try {
    const userId = req.user.id || req.user._id || req.user.sub;
    const { password } = req.body;
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password is required (min 6 chars)' });
    }
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;