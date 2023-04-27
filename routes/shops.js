const shops = require("../shops");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    res.status(200).send(shops);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
