const { Order } = require("../models/order")
const { Product } = require("../models/product")
const { auth, isUser, isShop, isShopAdmin } = require("../middleware/auth");

const router = require("express").Router();

router.post("/", auth, async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(200).send({
      success: true,
      result: savedOrder,
      message: "Create order success"
    });
  } catch (error) {
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
