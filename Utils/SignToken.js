const jwt = require("jsonwebtoken");

const genToken = (user) => {
    const payload = {
        user: {
            id: user._id,
            username: user.username,
        }
    };
    const options = {
        expiresIn: "1d"
    };
    return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = { genToken };
