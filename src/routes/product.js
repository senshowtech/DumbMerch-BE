const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");
const {
  addProducts,
  getAllProductPagination,
  getAllProduct,
  getDetailProduct,
  editProducts,
  deleteProduct,
  editStock,
} = require("../controller/product");

router.post("/product", auth, uploadFile("image"), addProducts);
router.get("/products/:page", getAllProductPagination);
router.get("/products/", getAllProduct);
router.get("/product/:id", auth, getDetailProduct);
router.patch("/product/:id", auth, uploadFile("image"), editProducts);
router.patch("/stock/:id", auth, editStock);
router.delete("/product/:id", auth, deleteProduct);

module.exports = router;
