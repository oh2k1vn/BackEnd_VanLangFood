const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 30 },
    phone: { type: String, required: true, minlength: 10, maxlength: 10 },
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
      unique: true,
    },
    password: { type: String, required: true, minlength: 3, maxlength: 1024 },
    role: { type: String, default: 'user' },
    avatar: { type: String, default: 'https://res.cloudinary.com/dcnzwz9sp/image/upload/v1682647020/admin_osba81.png', require: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

exports.User = User;
