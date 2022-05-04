const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const { Register, Login, getUser, checkAuth } = require("../controller/user");

router.post("/register", Register);
router.post("/login", Login);
router.get("/users", auth, getUser);
router.get("/check/auth", auth, checkAuth);

module.exports = router;
