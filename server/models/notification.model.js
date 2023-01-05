const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var now = new Date();

var Notification = new Schema({
  order: { type: Schema.Types.ObjectId, ref: "Orders", default: null },
  Message: { type: String },
  Date: { type: Date, default: Date.now() },
  Owner: [{ type: Schema.Types.ObjectId, ref: "User" }],
  Prescription: [{ type: Schema.Types.ObjectId, ref: "Prescription" }],
  Pharmacy: [{ type: Schema.Types.ObjectId, ref: "Pharmacy" }],
  status: { type: Boolean, default: false },
});
module.exports = mongoose.model("Notifications", Notification);
