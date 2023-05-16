const { User } = require("../models/user");
const Joi = require("joi");
const express = require("express");
const generateAuthToken = require("../utils/generateAuthToken");
const router = express.Router();

router.post("/", async (req, res) => {
  let token = req.headers["x-auth-token"];
  if (!token) return res.status(400).send({
    success: false,
    result: null,
    message: error.details[0].message
  });

  let user = await User.findOne({ token: token });
  if (!user) return res.status(400).send({
    success: false,
    result: null,
    message: "Invalid token"
  });

  res.send({
    success: true,
    result: user,
    token: token,
    message: "Get profile success"
  });
});

module.exports = router;
