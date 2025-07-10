// Tasks routes, CommonJS, JavaScript-only

const express = require('express');
const jwtAuth = require('../auth/jwtAuth');
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/TaskController');

const router = express.Router();

// All task routes protected
const { cacheResult } = require("../utils/cache");

router.get('/', jwtAuth, cacheResult("tasks", 30), getAllTasks);
router.get('/:id', jwtAuth, cacheResult("tasks_id", 15), getTaskById);
router.post('/', jwtAuth, createTask);
router.put('/:id', jwtAuth, updateTask);
router.delete('/:id', jwtAuth, deleteTask);

module.exports = router;