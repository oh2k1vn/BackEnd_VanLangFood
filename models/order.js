const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    shop: { type: Number, required: true, default: 0 },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 }
      },
    ],
    total: { type: Number, required: true },
    shipping: { type: Object, required: true },
    deliveryStatus: { type: String, default: "pending" },
    paymentMethod: { type: String, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

exports.Order = Order;
