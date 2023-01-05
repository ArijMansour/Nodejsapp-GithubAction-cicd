const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", //relation betwen the review and the user
    },
  },
  {
    timestamps: true,
  }
);

const MedecinSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    creationDate: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    expiresDate: {
      type: Date,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
    },

    multiple_resources: {
      type: [],
    },
    category: {
      type: Schema.ObjectId,
      ref: "Category",
    },
    pharmacy: {
      type: Schema.ObjectId,
      ref: "Pharmacy",
    },

    order: {
      type: Schema.ObjectId,
      ref: "Orders",
    },

    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },

    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    typeMedicine: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Medecines", MedecinSchema);
