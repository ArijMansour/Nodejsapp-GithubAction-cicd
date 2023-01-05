var mongoose = require("mongoose");

var UserSchema = require("./user.model");
Schema = mongoose.Schema;

const PharmacySchema = UserSchema.discriminator(
  "Pharmacy",
  new mongoose.Schema({
    pharmacyAddress: {
      type: String,
      required: false,
    },
  })
);

module.exports = mongoose.model("Pharmacy");
