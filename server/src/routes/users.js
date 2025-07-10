const express = require('express');
const router = express.Router();
const jwtAuth = require('../auth/jwtAuth');
const UserController = require('../controllers/UserController');

// Middleware: only allow access for admin role
function adminOnly(req, res, next) {
  if (req.user && req.user.role === 'admin') return next();
  return res.status(403).json({ message: 'Forbidden: Admins only' });
}

// List all users (GET /users)
const { cacheResult } = require("../utils/cache");

router.get('/', jwtAuth, cacheResult("users", 30), UserController.getAllUsers);

// Get a user by ID (GET /users/:id)
router.get('/:id', jwtAuth, cacheResult("users_id", 10), UserController.getUserById);

// Create a user (POST /users)
router.post('/', jwtAuth, (req, res, next) => {
 // Allow both admin and accountant to create users
 if (
   req.user &&
   (req.user.role === "admin" || req.user.role === "accountant")
 ) {
   return next();
 }
 return res.status(403).json({ message: "Forbidden: Admins and accountants only" });
}, UserController.createUser);

// Update a user by ID (PUT /users/:id)
router.put('/:id', jwtAuth, UserController.updateUser);

// Update user's Firebase token (PUT /users/:userId/firebase-token)
router.put('/:userId/firebase-token', jwtAuth, adminOnly, UserController.updateUserFirebaseToken);

// Delete a user by ID (DELETE /users/:id)
router.delete('/:id', jwtAuth, adminOnly, UserController.deleteUser);

module.exports = router;