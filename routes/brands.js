const brands = require("../data/brands");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    res.status(200).send(brands);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
