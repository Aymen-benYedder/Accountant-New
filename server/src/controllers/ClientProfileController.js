// ClientProfile Controller, CommonJS, JavaScript-only

const ClientProfile = require('../models/ClientProfile');

// Get all clients
exports.getAllClients = async (req, res) => {
  try {
    const clients = await ClientProfile.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch clients' });
  }
};

// Get client by id
exports.getClientById = async (req, res) => {
  try {
    const client = await ClientProfile.findById(req.params.id);
    if (!client) return res.status(404).json({ error: 'Client not found' });
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch client' });
  }
};

// Create new client
exports.createClient = async (req, res) => {
  console.log("requestion create of user from controller");
  try {
    const client = new ClientProfile(req.body);
    await client.save();
    res.status(201).json(client);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create client profile' });
  }
};

// Update client
exports.updateClient = async (req, res) => {
  try {
    const client = await ClientProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!client) return res.status(404).json({ error: 'Client not found' });
    res.json(client);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update client profile' });
  }
};

// Delete client
exports.deleteClient = async (req, res) => {
  try {
    const client = await ClientProfile.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ error: 'Client not found' });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete client profile' });
  }
};