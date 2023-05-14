const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const register = require("./routes/register");
const login = require("./routes/login");
const ordersRoute = require("./routes/orders");
const stripe = require("./routes/stripe");
const productsRoute = require("./routes/products");
const shopsRoute = require("./routes/shops");
const brandsRoute = require("./routes/brands");
const statsRoute = require("./routes/stats");
const ratingRoute = require("./routes/rating");

const app = express();
require("dotenv").config();


app.use(express.json());
app.use(cors());

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/orders", ordersRoute);
app.use("/api/stripe", stripe);
app.use("/api/products", productsRoute);
app.use("/api/shops", shopsRoute);
app.use("/api/brands", brandsRoute);
app.use("/api/stats", statsRoute);
app.use("/api/rating", ratingRoute);

app.get("/", (req, res) => {
  res.send("Welcome our to online shop API...");
});

const uri = process.env.DB_URI;
const port = process.env.PORT || 5000;

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
