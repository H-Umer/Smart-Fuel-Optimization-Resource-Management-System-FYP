const express = require('express');
const auth = require('../middleware/auth');
const Trip = require('../models/Trip');
const Vehicle = require('../models/Vehicle');

const router = express.Router();

const estimateDistance = (origin, destination) => {
  const base = Math.max(5, Math.abs(origin.length - destination.length) * 2 + 10);
  return Math.min(120, base + Math.floor((origin.charCodeAt(0) || 65) / 10));
};

const routeSuggestion = (distance) => {
  if (distance <= 20) return 'Take local roads and avoid rush-hour congested highways.';
  if (distance <= 50) return 'Use the fuel-efficient route with fewer detours and minimal idling.';
  return 'Combine long-haul errands and choose steady-speed highways to save fuel.';
};

router.get('/', auth, async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.id }).populate('vehicle');
    res.json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to load trips' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { origin, destination, plannedDate, vehicle: vehicleId } = req.body;
    const vehicle = await Vehicle.findOne({ _id: vehicleId, user: req.user.id });
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    const distanceKm = estimateDistance(origin, destination);
    const estimatedFuelLiters = Number((distanceKm / vehicle.fuelEfficiency).toFixed(2));
    const recommendedRoute = routeSuggestion(distanceKm);
    const crisisTip = 'Avoid non-essential travel and combine nearby tasks to reduce fuel usage.';

    const trip = new Trip({
      user: req.user.id,
      vehicle: vehicleId,
      origin,
      destination,
      plannedDate: plannedDate || Date.now(),
      distanceKm,
      estimatedFuelLiters,
      recommendedRoute,
      crisisTip,
    });

    await trip.save();
    res.json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create trip' });
  }
});

router.get('/crisis', auth, async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(5);
    res.json({
      crisisSuggestions: trips.map((trip) => ({
        tripId: trip.id,
        origin: trip.origin,
        destination: trip.destination,
        tip: 'Review this route for possible consolidation and avoid non-urgent travel.',
      })),
      summary: 'Prioritize essential tasks, combine trips, and reduce short non-essential journeys.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to load crisis recommendations' });
  }
});

module.exports = router;
