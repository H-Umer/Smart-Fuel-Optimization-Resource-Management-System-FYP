const express = require('express');
const auth = require('../middleware/auth');
const FuelRecord = require('../models/FuelRecord');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const records = await FuelRecord.find({ user: req.user.id }).populate('vehicle');
    const totals = records.reduce(
      (acc, record) => {
        acc.quantity += record.quantity;
        acc.cost += record.cost;
        return acc;
      },
      { quantity: 0, cost: 0 }
    );
    res.json({ records, totals });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to load fuel records' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { vehicle, date, quantity, cost, notes } = req.body;
    const record = new FuelRecord({ user: req.user.id, vehicle, date, quantity, cost, notes });
    await record.save();
    res.json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create fuel record' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const updates = req.body;
    const record = await FuelRecord.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      updates,
      { new: true }
    );
    if (!record) return res.status(404).json({ message: 'Fuel record not found' });
    res.json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update fuel record' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const record = await FuelRecord.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!record) return res.status(404).json({ message: 'Fuel record not found' });
    res.json({ message: 'Fuel record deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete fuel record' });
  }
});

module.exports = router;
