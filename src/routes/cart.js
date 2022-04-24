const express = require("express");
const router = express.Router();
const { addCart, getCart, deleteCart } = require("../controller/cart");
const { auth } = require("../middlewares/auth");

router.post("/add/cart", addCart);
router.get("/carts", auth, getCart);
router.delete("/cart/:idproduct", deleteCart);

module.exports = router;
