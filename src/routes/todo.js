const express = require("express");
const router = express.Router();
const {
  addTodo,
  getTodo,
  getDetailTodo,
  editTodo,
  deleteTodo,
  getAllTodoPagination,
} = require("../controller/todo");

router.post("/todo", addTodo);
router.get("/todos/:uuid", getAllTodoPagination);
router.get("/todo/:id", getDetailTodo);
router.patch("/todo/:id", editTodo);
router.delete("/todo/:id", deleteTodo);

module.exports = router;