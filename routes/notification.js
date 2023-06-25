const express = require("express");
const admin = require("firebase-admin");
const functions = require("firebase-functions");

const router = express.Router();

// Định nghĩa endpoint để gửi push notification
router.post("/send-notification", (req, res) => {
  const { token, data } = req.body;
  const { noti_type, title, body, image, priority } = data;

  const messagePayload = {
    token,
    data: {
      noti_type,
      title,
      body,
      image,
      priority,
    },
  };

  // Gửi thông báo
  admin
    .messaging()
    .send(messagePayload)
    .then((response) => {
      console.log("Successfully sent notification:", response);
      res.status(200).json({ message: "Notification sent successfully" });
    })
    .catch((error) => {
      console.log("Error sending notification:", error);
      res.status(500).json({ error: "Failed to send notification" });
    });
});

module.exports = router;
