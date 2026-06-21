const express = require('express');
const auth = require('../middleware/auth');
const Budget = require('../models/Budget');
const FuelRecord = require('../models/FuelRecord');

const router = express.Router();

const getMonthRange = (date) => {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
  return { start, end };
};

router.get('/', auth, async (req, res) => {
  try {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const { start, end } = getMonthRange(now);

    const budget = await Budget.findOne({ user: req.user.id, month, year });
    const records = await FuelRecord.find({ user: req.user.id, date: { $gte: start, $lte: end } });
    const spent = records.reduce((sum, record) => sum + record.cost, 0);
    res.json({ budget, spent, alert: budget && spent > budget.monthlyLimit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to load budget' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { month, year, monthlyLimit } = req.body;
    const budget = await Budget.findOneAndUpdate(
      { user: req.user.id, month, year },
      { monthlyLimit },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.json(budget);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save budget' });
  }
});

module.exports = router;
