const express = require("express");
const admin = require("firebase-admin");

const router = express.Router();

// Định nghĩa endpoint để gửi push notification
router.post("/send-notification", (req, res) => {
  const registrationToken = req.body.token;
  const message = {
    notification: {
      title: "Tiêu đề thông báo",
      body: "Nội dung thông báo",
    },
    token: registrationToken,
  };

  // Gửi thông báo
  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Thành công:", response);
      res.status(200).send("Thành công");
    })
    .catch((error) => {
      console.log("Lỗi:", error);
      res.status(500).send("Lỗi");
    });
});

module.exports = router;
