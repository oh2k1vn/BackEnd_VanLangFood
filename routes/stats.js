const { Order } = require("../models/order");
const { auth, isUser, isShop, isShopAdmin } = require("../middleware/auth");
const { Product } = require("../models/product");

const router = require("express").Router();

router.post("/shop", isShopAdmin, async (req, res) => {
  try {
    let stats = {};
    if (req.body.startTime && req.body.endTime) {
      const startTime = new Date(req.body.startTime);
      const endTime = new Date(req.body.endTime);
      const shopId = req.body.shop;

      stats = await Order.aggregate([
        // Match orders created in the previous month
        {
          $match: {
            createdAt:
            {
              $gte: startTime,
              $lte: endTime
            },
            shop: shopId
          },
        },
        // Project month and total fields
        {
          $project: {
            month: { $month: "$createdAt" },
            total: "$total",
          },
        },
        // Group by month and calculate the total amount
        {
          $group: {
            _id: "$month",
            totalAmount: { $sum: "$total" },
            totalOrder: { $sum: 1 },
          },
        },
      ]);

      const totalProduct = await Product.countDocuments({ shop: shopId });
      stats[0].totalProduct = totalProduct;

    }
    res.status(200).send({
      success: true,
      result: stats[0],
      message: "Statistic success"
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
