const { string } = require("joi");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Brand", productSchema);

exports.Product = Product;
