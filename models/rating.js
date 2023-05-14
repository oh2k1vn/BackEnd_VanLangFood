const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    rating: { type: Number, required: true },
    note: { type: String, required: false, default: "" },
  },
  { timestamps: true }
);

const Rating = mongoose.model("Rating", ratingSchema);

exports.Rating = Rating;
