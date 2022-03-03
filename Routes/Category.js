const express = require("express");
const router = express.Router();
const { readAllCategories, createMacroCategory, deleteMacroCategory, updateMacroCategory, createMicroCategory, deleteMicroCategory } = require("../Controllers/CategoryController");
const { auth } = require("../Middleware/authHandler");
const asyncHandler = require("express-async-handler");

router.get('/all', auth, asyncHandler(readAllCategories));
router.post('/macro', auth, asyncHandler(createMacroCategory))

router.delete('/macro', auth, asyncHandler(deleteMacroCategory));
router.put('/macro', auth, asyncHandler(updateMacroCategory));

router.post('/micro', auth, asyncHandler(createMicroCategory));
router.delete('/micro', auth, asyncHandler(deleteMicroCategory));


module.exports = router;