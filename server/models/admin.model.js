var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const User = require("./user.model");
const Admin = User.discriminator("Admin", new mongoose.Schema({}));

module.exports = Admin;
