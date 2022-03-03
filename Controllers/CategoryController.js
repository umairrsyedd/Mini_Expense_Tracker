const express = require("express");
const mongo = require("../Config/Mongodb")
const ObjectId = require('mongodb').ObjectId;
const { isEmpty } = require("../Utils/Validation");
// @ route GET api/category/all
// @ desc Get all categories of the user
// @ access Private
// @ params token
const readAllCategories = async (req, res) => {
    let db = mongo.getDb();
    let id = req.token.user.id;
    let user = await db.collection("User").find({ _id: ObjectId(id) }).toArray();
    if (isEmpty(user)) {
        return res.status(404).json({
            message: "User not found"
        });
    }
    let categories = user[0].categories;
    if (!categories) {
        return res.status(404).json({
            message: "No categories found"
        });
    }
    res.status(200).json({
        message: 'Categories Retreived',
        categories: categories
    });
}


// @ route POST api/category/macro
// @ desc Create new Macro category
// @ access Private
// @ params token
// @ body name, color
const createMacroCategory = async (req, res) => {
    let db = mongo.getDb()
    let id = req.token.user.id;
    let NewCategory = {
        name: req.body.name,
        color: req.body.color,
        macro_id: new ObjectId(),
        micro: []
    }
    let user = await db.collection("User").findOne({ _id: ObjectId(id) });
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }
    const category = await db.collection("User").updateOne({ _id: ObjectId(id) }, { $push: { categories: NewCategory } });
    res.status(200).json({
        message: "Category Created",
        category: category,
    });
}

// @ route DEL api/category/macro
// @ desc Delete Macro category
// @ access Private
// @ params token
// @ body macro_id
const deleteMacroCategory = async (req, res) => {
    let db = mongo.getDb()
    let id = req.token.user;
    let macro_id = req.body.macro_id;
    let category = await db.collection("User").updateOne({ _id: ObjectId(id) }, { $pull: { categories: { macro_id: ObjectId(macro_id) } } });
    res.status(200).json({
        message: "Macro Category Deleted with All It's Micro's",
        category: category
    });
}

// @ route PUT api/category/macro
// @ desc Update Macro category
// @ access Private
// @ params token
// @ body macro_id, name, color
const updateMacroCategory = async (req, res) => {
    let db = mongo.getDb()
    let { id } = req.token.user
    let { macro_id, name, color } = req.body
    let fetchedData = await db.collection("User").find({ _id: ObjectId(id), "categories.macro_id": ObjectId(macro_id) }).toArray();
    if (isEmpty(fetchedData)) {
        return res.status(404).json({
            message: "Category not found"
        });
    }
    let oldCategory = fetchedData[0].categories.filter(category => category.macro_id == macro_id);
    oldCategory = oldCategory[0];
    let newCategory = {
        name: oldCategory.name,
        color: oldCategory.color,
    }
    isEmpty(name) ? newCategory.name = oldCategory.name : newCategory.name = name;
    isEmpty(color) ? newCategory.color = oldCategory.color : newCategory.color = color;
    let updatedCategory = await db.collection("User").updateOne({ _id: ObjectId(id), "categories.macro_id": ObjectId(macro_id) }, {
        $set: {
            "categories.$.name": newCategory.name,
            "categories.$.color": newCategory.color
        }
    });
    res.status(200).json({
        message: "Macro Category Updated",
        category: updatedCategory
    });
}

// @ route POST api/category/micro
// @ desc Create new Micro category
// @ access Private
// @ params token
// @ body  name, emoji
const createMicroCategory = async (req, res) => {
    let db = mongo.getDb()
    let id = req.token.user;
    let macro_id = req.body.macro_id;
    let newMicroCategory = {
        micro_id: new ObjectId(),
        name: req.body.name,
        emoji: req.body.emoji,
    }
    let user = await db.collection("User").findOne({ _id: ObjectId(id) });
    let category = await db.collection("User").updateOne({ _id: ObjectId(id), "categories.macro_id": ObjectId(macro_id) }, { $push: { "categories.$.micro": newMicroCategory } });
    res.status(200).json({
        message: "Micro Category Created",
        category: category
    });
}

// @ route DEL api/category/micro
// @ desc Delete Micro category
// @ access Private
// @ params token
// @ body macro_id, micro_id
const deleteMicroCategory = async (req, res) => {
    let db = mongo.getDb()
    let { id } = req.token.user;
    let macro_id = req.body.macro_id;
    let micro_id = req.body.micro_id;
    let category = await db.collection("User").updateOne({ _id: ObjectId(id), "categories.macro_id": ObjectId(macro_id) }, { $pull: { "categories.$.micro": { micro_id: ObjectId(micro_id) } } });
    res.status(200).json({
        message: "Micro Category Deleted",
        category: category
    });
}




module.exports = { readAllCategories, createMacroCategory, deleteMacroCategory, updateMacroCategory, createMicroCategory, deleteMicroCategory }