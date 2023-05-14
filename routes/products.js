const { Product } = require("../models/product");
const { auth, isUser, isShop, isAdmin } = require("../middleware/auth");
const cloudinary = require("../utils/cloudinary");

const router = require("express").Router();

router.post("/", isShop, async (req, res) => {
  const { name, brand, desc, price, image, shop } = req.body;

  try {
    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "ml_default",
      });

      if (uploadedResponse) {
        const product = new Product({
          name,
          brand: parseInt(brand),
          shop: parseInt(shop),
          desc,
          price,
          image: uploadedResponse.url ?? "",
          sold: 0,
        });

        const savedProduct = await product.save();
        res.status(200).send({
          success: true,
          result: savedProduct,
          message: "Create success"
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      result: null,
      message: err.message
    });
  }
});

router.delete("/:id", isShop, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      result: true,
      message: "Product has been deleted..."
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      result: null,
      message: err.message
    });
  }
});

router.get("/brand", async (req, res) => {
  const qbrand = req.query.id;
  try {
    let products;

    if (qbrand) {
      products = await Product.find({
        brand: qbrand,
      });
    } else {
      products = await Product.find();
    }

    res.status(200).send({
      success: true,
      result: products,
      message: "Getlist success"
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      result: null,
      message: err.message
    });
  }
});

router.get("/shop", async (req, res) => {
  const qShop = req.query.id;
  try {
    let products;

    if (qShop) {
      products = await Product.find({
        shop: qShop,
      });
    } else {
      products = await Product.find();
    }

    res.status(200).send({
      success: true,
      result: products,
      message: "Getlist success"
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      result: null,
      message: err.message
    });
  }
});

router.get("/", async (req, res) => {
  try {
    let products;

    products = await Product.find();

    res.status(200).send({
      success: true,
      result: products,
      message: "Getlist success"
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      result: null,
      message: err.message
    });
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).send({
      success: true,
      result: product,
      message: "Find success"
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      result: null,
      message: err.message
    });
  }
});

router.put("/:id", isShop, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      result: updatedProduct,
      message: "Update success"
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      result: null,
      message: err.message
    });
  }
});

module.exports = router;
