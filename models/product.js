const { string } = require("joi");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: Number, required: true },
    shop: { type: Number, required: false },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    sold: { type: Number, required: false },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

exports.Product = Product;
