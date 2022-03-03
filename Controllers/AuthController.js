const mongo = require("../Config/Mongodb")
const validator = require('validator');
const { isEmpty } = require('../Utils/Validation');
const { defaultCategories } = require("../Utils/Defaults");
const { genToken } = require("../Utils/SignToken");
const { checkPassword, generatePassword } = require('../Utils/Password');


// @ route POST /api/auth/login
// @ desc Login user / Returning JWT Token
// @ access Public
// @ body username, password
const loginUser = async (req, res) => {
    let db = mongo.getDb();
    let { username, password } = req.body;
    if (isEmpty(username) || isEmpty(password)) {
        return res.status(400).send({ error: "Username or password is empty" });
    }
    let user = await db.collection("User").findOne({ username: username });
    if (!user) {
        return res.status(400).send({ error: "User not found" });
    }
    let isPasswordCorrect = await checkPassword(password, user.password);
    if (isPasswordCorrect) {
        let token = genToken(user);
        res.status(200).json({
            message: "User logged in",
            token: token
        });
    }
    else {
        return res.status(400).send({ error: "Incorrect password" });
    }
}

// @ route POST /api/auth/register
// @ desc Register user / Returning JWT Token
// @ access Public
// @ body username, password, (Optional)- name,email
const registerUser = async (req, res) => {
    let db = mongo.getDb();
    let user = {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: null,
        categories: defaultCategories
    }
    if (isEmpty(user.username) || isEmpty(req.body.password)) {
        return res.status(400).send({ error: "username and password are required to register" });
    }
    if (!validator.isEmail(user.email)) {
        return res.status(400).send({ error: "Email is invalid" });
    }
    let userExists = await db.collection("User").findOne({ username: req.body.username });
    if (userExists) {
        return res.status(400).send({ error: "Username already exists" });
    }
    else {
        let hashedPassword = await generatePassword(req.body.password);
        user.password = hashedPassword;
        let newUser = await db.collection("User").insertOne(user);
        // Create New Expense Collection
        await db.collection("Expense").insertOne({
            _id: newUser.insertedId,
            username: user.username,
            expenses: []
        });
        let token = genToken(user);
        res.status(200).json({
            message: "User Created",
            user: newUser,
            token: token
        });
    }

}

module.exports = { loginUser, registerUser };