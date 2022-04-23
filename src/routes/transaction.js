const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const {
  AddTransaction,
  getAllTransaction,
} = require("../controller/transaction");

router.post("/transaction", auth, AddTransaction);
router.get("/transactions", auth, getAllTransaction);

module.exports = router;
