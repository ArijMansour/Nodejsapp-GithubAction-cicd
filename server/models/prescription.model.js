const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },

  description: {
    type: String,
  },

  multiple_resources: {
    type: [],
  },

  dosage: {
    type: String,
  },
  state: {
    enum: ["PENDING", "CANCELED", "CONFIRMED"],
    default: "PENDING",
    type: String,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  pharmacy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pharmacy",
  },
});

module.exports = mongoose.model("Prescription", prescriptionSchema);
