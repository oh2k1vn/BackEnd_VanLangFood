const { auth, isUser, isShop, isShopAdmin } = require("../middleware/auth");
const { FCMLog } = require("../models/fcmLog");

const router = require("express").Router();

router.post("/", auth, async (req, res) => {
  try {
    const saveFCMLog = new FCMLog(req.body);
    const saved = await saveFCMLog.save();
    res.status(200).send({
      success: true,
      result: saved,
      message: "Create FCM log success"
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      result: null,
      message: error.message
    });
  }
});

router.post("/getByQuery", auth, async (req, res) => {
  try {
    const fcmLogs = await FCMLog.find(req.body);
    res.status(200).send({
      success: true,
      result: fcmLogs,
      message: "Getlist success"
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      result: null,
      message: error.message
    });
  }
});

module.exports = router;
