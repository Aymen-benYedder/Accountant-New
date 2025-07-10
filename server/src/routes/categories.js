const express = require('express');
const jwtAuth = require('../auth/jwtAuth');
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/CategoryController');

const router = express.Router();

// All category routes protected
const { cacheResult } = require("../utils/cache");

router.get('/', jwtAuth, cacheResult("categories", 60), getAllCategories);
router.get('/:id', jwtAuth, cacheResult("categories_id", 30), getCategoryById);
router.post('/', jwtAuth, createCategory);
router.put('/:id', jwtAuth, updateCategory);
router.delete('/:id', jwtAuth, deleteCategory);

module.exports = router;