const { Order } = require("../models/Order");
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
  } catch (err) {
    res.status(500).send({
      success: false,
      result: null,
      message: err.message
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
  } catch (err) {
    res.status(500).send({
      success: false,
      result: null,
      message: err.message
    });
  }
});

router.delete("/:id", isShopAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).send("Order has been deleted...");
  } catch (err) {
    res.status(500).send({
      success: false,
      result: null,
      message: err.message
    });
  }
});

router.post("/getByQuery", isShopAdmin, async (req, res) => {
  try {
    const orders = await Order.find(req.body);
    res.status(200).send({
      success: true,
      result: orders,
      message: "Getlist success"
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      result: null,
      message: err.message
    });
  }
});

router.get("/", isShopAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).send({
      success: true,
      result: orders,
      message: "Getlist success"
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      result: null,
      message: err.message
    });
  }
});

module.exports = router;
