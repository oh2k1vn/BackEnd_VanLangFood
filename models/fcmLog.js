const mongoose = require("mongoose");

const fcmLogSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    phone: { type: String, required: false },
    data: { type: Object, required: true, default: null },
  },
  { timestamps: true }
);

const FCMLog = mongoose.model("FCMLog", fcmLogSchema);

exports.FCMLog = FCMLog;
