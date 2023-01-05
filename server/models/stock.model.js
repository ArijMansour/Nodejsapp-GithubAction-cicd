const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StockSchema = new Schema({
  item: {
    type: String,
    required: true,
  },
  createdAt: {
    Type: Date,
  },
  state: {
    type: Boolean,
  },
  quantity: {
    type: Number,
  },

  // medecines: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Medecines",
  // },
});

module.exports = mongoose.model("Stocks", StockSchema);
