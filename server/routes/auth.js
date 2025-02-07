const express = require("express");
const router = express.Router();

const { profile, register, login, logout } = require("../controllers/auth");

// sign - up
router.post("/register", register);

// login
router.post("/login", login);

// logout
router.post("/logout", logout);

router.get("/profile", profile);

module.exports = router;
