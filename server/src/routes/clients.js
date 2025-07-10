// Clients routes, CommonJS, JavaScript-only

const express = require('express');
const jwtAuth = require('../auth/jwtAuth');
const {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} = require('../controllers/ClientProfileController');

const router = express.Router();

// Protect all routes with JWT middleware
const { cacheResult } = require("../utils/cache");

router.get('/', jwtAuth, cacheResult("clients", 60), getAllClients);
router.get('/:id', jwtAuth, cacheResult("clients_id", 30), getClientById);
router.post('/', jwtAuth, createClient);
router.put('/:id', jwtAuth, updateClient);
router.delete('/:id', jwtAuth, deleteClient);

module.exports = router;