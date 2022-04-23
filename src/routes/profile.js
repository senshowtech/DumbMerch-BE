const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");
const { addProfile, editProfile } = require("../controller/profile");

router.post("/profile", auth, addProfile);
router.patch("/profile/:id", uploadFile("image"), auth, editProfile);

module.exports = router;
