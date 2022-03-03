const express = require("express");
const router = express.Router();
const { readExpense, readLastNExpenses, readMonthExpenses, createExpense, deleteExpense, updateExpense } = require("../Controllers/ExpenseController");
const { auth } = require("../Middleware/authHandler");
const asyncHandler = require("express-async-handler");

router.get("/", auth, asyncHandler(readExpense));
router.get('/recent', auth, asyncHandler(readLastNExpenses));
router.get('/month', auth, asyncHandler(readMonthExpenses));

router.post('/', auth, asyncHandler(createExpense));
router.put('/', auth, asyncHandler(updateExpense));
router.delete('/', auth, asyncHandler(deleteExpense));

module.exports = router;