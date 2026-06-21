const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    origin: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    plannedDate: { type: Date, default: Date.now },
    distanceKm: { type: Number, required: true },
    estimatedFuelLiters: { type: Number, required: true },
    recommendedRoute: { type: String, default: 'Fuel-efficient route' },
    crisisTip: { type: String, default: 'Combine this trip with nearby errands to save fuel' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Trip', TripSchema);
