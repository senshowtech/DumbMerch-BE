const express = require("express");
const router = express.Router();
const { addCart, getCart } = require("../controller/cart");
const { auth } = require("../middlewares/auth");

router.post("/add/cart", addCart);
router.get("/carts", auth, getCart);

module.exports = router;
