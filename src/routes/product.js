const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");
const {
  addProducts,
  getAllProduct,
  getDetailProduct,
  editProducts,
  deleteProduct,
} = require("../controller/product");

router.post("/product", auth, uploadFile("image"), addProducts);
router.get("/products/:page", getAllProduct);
router.get("/product/:id", auth, getDetailProduct);
router.patch("/product/:id", uploadFile("image"), auth, editProducts);
router.delete("/product/:id", auth, deleteProduct);

module.exports = router;
