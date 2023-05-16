const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const Joi = require("joi");
const express = require("express");
const generateAuthToken = require("../utils/generateAuthToken");
const router = express.Router();

router.post("/", async (req, res) => {
  const schema = Joi.object({
    phone: Joi.string().min(10).max(10).required(),
    password: Joi.string().min(6).max(200).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({
    success: false,
    result: null,
    message: error.details[0].message
  });

  let user = await User.findOne({ phone: req.body.phone });
  if (!user) return res.status(400).send({
    success: false,
    result: null,
    message: "Invalid email or password..."
  });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send({
      success: false,
      result: null,
      message: "Invalid email or password..."
    });

  const token = generateAuthToken(user);

  user = await User.findByIdAndUpdate(
    { _id: user._id },
    {
      $set: {
        token: token
      }
    },
    { new: true }
  );

  res.send({
    success: true,
    result: user,
    token: token,
    message: "Login success"
  });
});

module.exports = router;
