// Tasks routes, CommonJS, JavaScript-only

const express = require('express');
const jwtAuth = require('../auth/jwtAuth');
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getUserTasks,
  submitTask,
  reviewTask,
} = require('../controllers/TaskController');

const router = express.Router();

// All task routes protected
const { cacheResult } = require("../utils/cache");

// Standard CRUD routes
router.get('/', jwtAuth, cacheResult("tasks", 30), getAllTasks);
router.get('/:id', jwtAuth, cacheResult("tasks_id", 15), getTaskById);
router.post('/', jwtAuth, createTask);
router.put('/:id', jwtAuth, updateTask);
router.delete('/:id', jwtAuth, deleteTask);

// Additional task routes
router.get('/user/:userId', jwtAuth, getUserTasks); // Get tasks for a specific user
router.post('/:taskId/submit', jwtAuth, submitTask); // Submit task (client)
router.post('/:taskId/review', jwtAuth, reviewTask); // Review task (accountant)

module.exports = router;