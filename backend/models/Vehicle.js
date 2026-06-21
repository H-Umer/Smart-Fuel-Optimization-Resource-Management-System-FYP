const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true },
    make: { type: String, trim: true },
    model: { type: String, trim: true },
    fuelEfficiency: { type: Number, required: true },
    tankCapacity: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vehicle', VehicleSchema);
