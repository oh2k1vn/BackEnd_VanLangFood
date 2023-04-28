const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).send({
      success: false,
      result: null,
      message: "Access denied. Not authenticated..."
    });
  try {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const decoded = jwt.verify(token, jwtSecretKey);

    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send(res.status(403).send({
      success: false,
      result: null,
      message: "Invalid auth token..."
    }));
  }
};

// For User Profile
const isUser = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.role == 'user') {
      next();
    } else {
      res.status(403).send({
        success: false,
        result: null,
        message: "Access denied. Not authorized..."
      });
    }
  });
};

// For Admin
const isAdmin = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.role == "admin") {
      next();
    } else {
      res.status(403).send({
        success: false,
        result: null,
        message: "Access denied. Not authorized..."
      });
    }
  });
};

// For Shop
const isShop = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.role == "shop") {
      next();
    } else {
      res.status(403).send({
        success: false,
        result: null,
        message: "Access denied. Not authorized..."
      });
    }
  });
};

// For Shop
const isShopAdmin = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.role == "shop" || req.user.role == "admin") {
      next();
    } else {
      res.status(403).send({
        success: false,
        result: null,
        message: "Access denied. Not authorized..."
      });
    }
  });
};

module.exports = { auth, isUser, isAdmin, isShop, isShopAdmin };
