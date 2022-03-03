const { MongoClient } = require("mongodb");

let dbConnection;
const connectDb = (callback) => {
    const DB_URI = process.env.NODE_ENV === 'production' ? process.env.PROD_DB_URI : process.env.DEV_DB_URI;
    const client = new MongoClient(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    client.connect(function (err, db) {
        if (err || !db) {
            return callback(err);
        }
        dbConnection = db.db();
        return callback();
    });
}

const getDb = () => {
    return dbConnection;
}

const closeDb = () => {
    dbConnection.close();
}


module.exports = { connectDb, getDb, closeDb };