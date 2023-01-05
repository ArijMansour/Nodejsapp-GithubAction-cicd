var mongoose = require("mongoose");

var UserSchema = require("./user.model");
Schema = mongoose.Schema;
const PatientSchema = UserSchema.discriminator(
  "Patient",
  new mongoose.Schema({
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
  })
);

module.exports = mongoose.model("Patient");
