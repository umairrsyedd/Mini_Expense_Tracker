const express = require("express");
const mongo = require("../Config/Mongodb")

// @desc Get User Data From Database
// @route GET /api/user
// @access Public
const getUser = async (req, res) => {
    let db = mongo.getDb();
    let username = req.query.username;
    let fetchedData = await db.collection("User").find({ username: username }).toArray();
    res.json({ fetchedData: fetchedData });
}



module.exports = { getUser }