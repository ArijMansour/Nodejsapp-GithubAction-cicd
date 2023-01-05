const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  creationDate: {
    Type: Date,
  },
  state: {
    type: Boolean,
  },

  userEmail: {
    type: String,
  },
  Pharmacy: { type: Schema.ObjectId, ref: "Pharmacy" },

});

module.exports = mongoose.model("Requests", RequestSchema);
