const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { getUser } = require("../Controllers/UserController");

router.route('/').get(asyncHandler(getUser))

module.exports = router;