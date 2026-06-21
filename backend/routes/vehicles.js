const express = require('express');
const auth = require('../middleware/auth');
const Vehicle = require('../models/Vehicle');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ user: req.user.id });
    res.json(vehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to load vehicles' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ _id: req.params.id, user: req.user.id });
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json(vehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to load vehicle' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { name, make, model, fuelEfficiency, tankCapacity } = req.body;
    const vehicle = new Vehicle({
      user: req.user.id,
      name,
      make,
      model,
      fuelEfficiency,
      tankCapacity,
    });
    await vehicle.save();
    res.json(vehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create vehicle' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const updates = req.body;
    const vehicle = await Vehicle.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      updates,
      { new: true }
    );
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json(vehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update vehicle' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const vehicle = await Vehicle.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json({ message: 'Vehicle deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete vehicle' });
  }
});

module.exports = router;
