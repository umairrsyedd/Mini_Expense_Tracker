const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(bearer, process.env.JWT_SECRET);
            req.token = decoded;
            next();
        }
        catch (err) {
            res.status(401).json({
                message: "Invalid Token"
            });
        }
    }
    else {
        res.status(401).json({
            message: "Please Login To Continue"
        });
    }
}

module.exports = { auth };