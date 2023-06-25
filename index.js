const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ordersRoute = require("./routes/orders");
const stripe = require("./routes/stripe");
const productsRoute = require("./routes/products");
const shopsRoute = require("./routes/shops");
const brandsRoute = require("./routes/brands");
const statsRoute = require("./routes/stats");
const ratingRoute = require("./routes/rating");
const userRoute = require("./routes/user");
const notificationRouter = require("./routes/notification");
const admin = require("firebase-admin");


// Khởi tạo ứng dụng Firebase Admin
const serviceAccount = require("./config/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
const uri = process.env.DB_URI;
const port = process.env.PORT || 5000;

app.use("/api/orders", ordersRoute);
app.use("/api/stripe", stripe);
app.use("/api/products", productsRoute);
app.use("/api/shops", shopsRoute);
app.use("/api/brands", brandsRoute);
app.use("/api/stats", statsRoute);
app.use("/api/rating", ratingRoute);
app.use("/api/user", userRoute);
app.use("/api/notification", notificationRouter);

app.get("/", (req, res) => {
  res.send("Welcome our to online shop API...");
});

app.listen(port, () => {
  console.info(`Server running on port: ${port}...`);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.info("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));
