const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const Joi = require("joi");
const express = require("express");
const generateAuthToken = require("../utils/generateAuthToken");
const router = express.Router();

router.post("/", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phone: Joi.string().min(10).max(10).required(),
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
    role: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ phone: req.body.phone });
  if (user) return res.status(400).send({
    success: false,
    result: null,
    message: "User already exists..."
  });

  const { name, email, phone, password, role } = req.body;
  user = new User({ name, phone, email, password, role });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const result = await user.save();
  const token = generateAuthToken(user);
  res.send({
    success: true,
    result: result,
    token: token,
    message: "Register success"
  });
});

module.exports = router;
