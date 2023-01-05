var mongoose = require("mongoose");

var UserSchema = require("./user.model");
Schema = mongoose.Schema;
const ShipperSchema = UserSchema.discriminator(
  "Shipper",
  new mongoose.Schema({
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },

    city: {
      type: String,
      required: false,
    },
    order: {
      type: Schema.ObjectId,
      ref: "Order",
    },
  })
);

module.exports = mongoose.model("Shipper");
