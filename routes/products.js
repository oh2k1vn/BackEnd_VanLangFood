const { Product } = require("../models/product");
const { auth, isUser, isShop, isAdmin, isShopAdmin } = require("../middleware/auth");
const cloudinary = require("../utils/cloudinary");

const router = require("express").Router();

router.post("/", isShopAdmin, async (req, res) => {
  const { name, brand, desc, price, image, shop } = req.body;

  try {
    if (!image) {
      res.status(200).send({
        success: false,
        result: null,
        message: "Image null"
      });
    }
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
          image: uploadedResponse?.url ?? "",
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
      message: error.message
    });
  }
});

router.delete("/:id", isShopAdmin, async (req, res) => {
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
      message: error.message
    });
  }
});

router.post("/getByQuery", async (req, res) => {
  try {
    const { from, size, shop, brand } = req.body;
    let products;

    if (!from && !size && !shop && !brand) {
      products = await Product.find();
    } else {
      const query = Product.find();
      if (from) {
        query.skip(Number(from));
      }
      if (size) {
        query.limit(Number(size));
      }
      if (shop) {
        query.where('shop').equals(Number(shop));
      }
      if (brand) {
        query.where('brand').equals(Number(brand));
      }
      products = await query.exec();
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
      message: error.message
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
      message: error.message
    });
  }
});

router.put("/:id", isShopAdmin, async (req, res) => {
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
      message: error.message
    });
  }
});

module.exports = router;
