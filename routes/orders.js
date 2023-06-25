const { Order } = require("../models/order")
const { Product } = require("../models/product")
const { auth, isUser, isShop, isShopAdmin } = require("../middleware/auth");

const router = require("express").Router();

router.post("/", auth, async (req, res) => {
  try {
    const { products } = req.body;
    if (products && products.length) {
      const updatePromises = products.map(async (item) => {
        const { product, quantity } = item;
        const updatedProduct = await Product.findByIdAndUpdate(
          product,
          {
            $inc: { sold: quantity } // Increment the "sold" field by the quantity
          },
          { new: true }
        );
        return updatedProduct;
      });
    }

    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(200).send({
      success: true,
      result: savedOrder,
      message: "Create order success"
    });

  } catch (error) {
    console.log("🚀  file: orders.js:33  router.post  error", error)
    res.status(500).send({
      success: false,
      result: null,
      message: error.message
    });
  }
});

router.put("/:id", isShopAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      result: updatedOrder,
      message: "Update order success"
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      result: null,
      message: error.message
    });
  }
});

router.delete("/:id", isShopAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).send("Order has been deleted...");
  } catch (error) {
    res.status(500).send({
      success: false,
      result: null,
      message: error.message
    });
  }
});

router.post("/getByQuery", auth, async (req, res) => {
  try {
    const orders = await Order.find(req.body).populate("user").populate("products.product");
    res.status(200).send({
      success: true,
      result: orders,
      message: "Getlist success"
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      result: null,
      message: error.message
    });
  }
});

router.get("/", isShopAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("products.product");;

    res.status(200).send({
      success: true,
      result: orders,
      message: "Getlist success"
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      result: null,
      message: error.message
    });
  }
});

module.exports = router;
