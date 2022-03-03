const express = require("express");
const mongo = require("../Config/Mongodb")
const { isEmpty } = require('../Utils/Validation');
var ObjectId = require('mongodb').ObjectId;

// @ route  GET api/expense/
// @ desc   Get Expense
// @ access Private
// @ params token, expense_id
const readExpense = async (req, res) => {
    let db = mongo.getDb();
    let id = req.token.user;
    let expense_id = req.query.expense_id;
    let fetchedData = await db.collection("Expense").find({ user_id: ObjectId(id) }).toArray();
    let expense = fetchedData[0].expenses.filter(expense => expense.expense_id == expense_id)
    res.status(200).json({
        message: 'Expense Retreived',
        expense: expense[0]
    });
}

// @ route  GET api/expense/recent/:n
// @ desc   Get Last N Expenses
// @ access Private
// @ params token, num
const readLastNExpenses = async (req, res) => {
    let db = mongo.getDb();
    let id = req.token.user;
    let numberOfExpenses = req.query.num;
    let fetchedData = await db.collection("Expense").find({ _id: ObjectId(id) }).toArray();
    let expenses = fetchedData[0].expenses.reverse();
    let lastNExpenses = expenses.slice(0, numberOfExpenses);
    res.status(200).json({
        message: ` Last ${numberOfExpenses} Expenses Retreived `,
        expenses: lastNExpenses
    });
}


// @ route  GET api/expense/month/
// @ desc   Get Expenses of Nth Month
// @ access Private
// @ params token, year, month
const readMonthExpenses = async (req, res) => {
    let db = mongo.getDb();
    let { id } = req.token.user;
    let month = req.query.month;
    let year = req.query.year;
    let fetchedData = await db.collection("Expense").find({ _id: ObjectId(id) }).toArray();
    let expenses = fetchedData[0].expenses.filter(expense => expense.date.getMonth() == month && expense.date.getFullYear() == year);
    res.status(200).json({
        message: 'Months Expenses Retreived',
        expenses: expenses
    });
}

// @ route  POST api/expense/
// @ desc   Create Expense
// @ access Private
// @ params token
// @ body  macro, macro_id,  micro_id, amount, note
const createExpense = async (req, res) => {
    let db = mongo.getDb()
    let id = req.token.user;
    let { macro, macro_id, micro, micro_id, amount, note } = req.body;
    let date = new Date();
    if (isEmpty(macro) || isEmpty(amount)) {
        res.status(400).json({
            message: "Macro and Amount are required"
        });
    }
    else {
        let expense = {
            expense_id: new ObjectId(),
            macro: macro,
            macro_id: ObjectId(macro_id),
            micro: micro,
            micro_id: ObjectId(micro_id),
            amount: amount,
            note: note,
            date: date,
        }
        let addedExpense = await db.collection("Expense").updateOne({ _id: ObjectId(id) }, { $push: { expenses: expense } }, { upsert: true });
        res.status(200).json({
            message: "Expense Created",
            addedExpense: addedExpense
        });


    }
}

// @ route PUT api/expense/
// @ desc   Update Expense
// @ access Private
// @ params token
// @ body  macro, macro_id, micro, micro_id, amount, note (Optional)
const updateExpense = async (req, res) => {
    let db = mongo.getDb()
    let { id } = req.token.user
    let { macro, macro_id, micro, micro_id, amount, note, expense_id } = req.body;
    let fetchedData = await db.collection("Expense").find({ user_id: ObjectId(id) }).toArray();
    let oldExpense = fetchedData[0].expenses.filter(expense => expense.expense_id == ObjectId(expense_id))
    console.log(oldExpense)
    let expense = {
        macro: oldExpense.macro,
        macro_id: oldExpense.macro_id,
        micro: oldExpense.micro,
        micro_id: oldExpense.micro_id,
        amount: oldExpense.amount,
        note: oldExpense.note,
        date: oldExpense.date,
    }
    isEmpty(macro) ? expense.macro = oldExpense.macro : expense.macro = macro;
    isEmpty(macro_id) ? expense.macro_id = oldExpense.macro_id : expense.macro_id = ObjectId(macro_id);
    isEmpty(micro) ? expense.micro = oldExpense.micro : expense.micro = micro;
    isEmpty(micro_id) ? expense.micro_id = oldExpense.micro_id : expense.micro_id = ObjectId(micro_id);
    isEmpty(amount) ? expense.amount = oldExpense.amount : expense.amount = amount;
    isEmpty(note) ? expense.note = oldExpense.note : expense.note = note;


    let expenseUpdated = await db.collection("Expense").updateOne({ user_id: ObjectId(id), "expenses.expense_id": ObjectId(expense_id) }, {
        $set: {
            "expenses.$.macro": expense.macro,
            "expenses.$.macro_id": expense.macro_id,
            "expenses.$.micro": expense.micro,
            "expenses.$.micro_id": expense.micro_id,
            "expenses.$.amount": expense.amount,
            "expenses.$.note": expense.note
        }
    });
    res.status(200).json({
        message: "Expense Updated",
        expense: expenseUpdated
    });
}

// @ route DELETE api/expense/
// @ desc   Delete Expense
// @ access Private
// @ params token, expense_id
const deleteExpense = async (req, res) => {
    let db = mongo.getDb()
    let { id } = req.token.user;
    let expense_id = req.query.expense_id;
    let expense = await db.collection("Expense").updateOne({ _id: ObjectId(id) }, { $pull: { expenses: { expense_id: ObjectId(expense_id) } } });
    res.status(200).json({
        message: "Expense Deleted",
        expense: expense
    });
}

module.exports = { readExpense, readLastNExpenses, readMonthExpenses, createExpense, deleteExpense, updateExpense }