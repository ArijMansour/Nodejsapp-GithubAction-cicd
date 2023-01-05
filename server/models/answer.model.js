const mongoose = require("mongoose");
var dateFormat = require("dateformat");
var Schema = mongoose.Schema;
var now = new Date();

var AnswerSchema = new Schema({
  Question: {
    type: Schema.Types.ObjectId,
    ref: "question",
  },
  Body: {
    type: String,
    required: [true, "Answer Body required"],
  },
  Writer: {
    ref: "User",
  },
  Date: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("Answers", AnswerSchema);
