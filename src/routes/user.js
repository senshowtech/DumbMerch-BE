const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const { Register, Login, getUser } = require("../controller/user");

router.post("/register", Register);
router.post("/login", Login);
router.get("/users", auth, getUser);

module.exports = router;
