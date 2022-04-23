const express = require("express");
const { auth } = require("../middlewares/auth");
const router = express.Router();
const {
  addCategory,
  getAllCategory,
  getDetailCategory,
  editCategory,
  deleteCategory,
} = require("../controller/category");

router.post("/category", auth, addCategory);
router.get("/categories", getAllCategory);
router.get("/category/:id", auth, getDetailCategory);
router.patch("/category/:id", auth, editCategory);
router.delete("/category/:id", auth, deleteCategory);

module.exports = router;
