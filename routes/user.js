const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const Joi = require("joi");
const express = require("express");
const generateAuthToken = require("../utils/generateAuthToken");
const { default: mongoose } = require("mongoose");
const cloudinary = require("../utils/cloudinary");
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

router.put("/", async (req, res) => {
  const { name, avatar, id } = req.body;

  let user = await User.findById(id);
  if (!user) {
    return res.status(400).send({
      success: false,
      result: null,
      message: "User not exists..."
    });
  }

  let uploadedResponse = null;
  if (avatar) {
    uploadedResponse = await cloudinary.uploader.upload(avatar, {
      upload_preset: "ml_default",
    });
  }

  const result = await User.findOneAndUpdate(
    { _id: new mongoose.mongo.ObjectId(id) },
    {
      name: name ?? user.name,
      avatar: uploadedResponse.url ?? user.avatar,
    }
  );

  if (!result) {
    return res.status(400).send({
      success: false,
      result: null,
      message: "Update fail"
    });
  }

  res.send({
    success: true,
    result: result,
    message: "Update success"
  });
});

router.post("/login", async (req, res) => {
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


router.post("/profile", async (req, res) => {
  let token = req.headers["x-auth-token"];
  // if (!token) return res.status(400).send({
  //   success: false,
  //   result: null,
  //   message: "Token null"
  // });
  const { _id } = req.body;
  if (!_id) {
    return res.status(400).send({
      success: false,
      result: null,
      message: "Id null"
    });
  }

  let user = await User.findById(_id);
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
