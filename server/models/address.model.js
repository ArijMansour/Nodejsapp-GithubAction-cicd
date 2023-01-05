const mongoose = require("mongoose");

// C
const addressSchema = new mongoose.Schema({
  buildingNumber: {
    type: Number,
    required: false,
    trim: true,
  },
  zip: {
    type: String,
    trim: true,
  },

  city: {
    type: String,
    trim: true,
  },

  country: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  lat: {
    type: String,
  },
  lng: {
    type: String,
  },
  address: {
    type: String,
    trim: true,
    min: 10,
    max: 100,
  },
});

// B
const userAddressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    address: [addressSchema],
  },
  { timestamps: true }
);

mongoose.model("Address", addressSchema);
module.exports = mongoose.model("UserAddress", userAddressSchema);
