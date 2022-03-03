const express = require("express");
const router = express.Router();
const { loginUser, registerUser } = require("../Controllers/AuthController");
const asyncHandler = require("express-async-handler");

router.route('/login').post(asyncHandler(loginUser));
router.route('/register').post(asyncHandler(registerUser));

module.exports = router;
