const { auth, isUser, isShop, isShopAdmin } = require("../middleware/auth");
const { Rating } = require("../models/rating");

const router = require("express").Router();

router.post("/", auth, async (req, res) => {
  try {
    const newRating = new Rating(req.body);
    const savedRating = await newRating.save();
    res.status(200).send({
      success: true,
      result: savedRating,
      message: "Create rating success"
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      result: null,
      message: err.message
    });
  }
});

router.post("/getByQuery", auth, async (req, res) => {
  try {
    const ratings = await Rating.find(req.body);
    res.status(200).send({
      success: true,
      result: ratings,
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
