const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    shop: { type: Number, required: true, default: 0 },
    products: [
      { productId: { type: String }, quantity: { type: Number, default: 1 } },
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
