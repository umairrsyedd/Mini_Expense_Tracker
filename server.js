const express = require('express');
const Mongo = require('./Config/Mongodb');
const app = express();
const helmet = require('helmet')
const morgan = require('morgan')
require('dotenv').config();


//Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(helmet())
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Connect MongoDB & Start Server
const ServerPort = process.env.NODE_ENV === 'production' ? process.env.PROD_PORT : process.env.DEV_PORT;
Mongo.connectDb(() => {
    console.log('Connected to MongoDB');
    app.listen(ServerPort, () => {
        console.log(`Server running on port ${ServerPort}`);
    })
})

// Routes
app.use('/api/test', require('./Routes/Test'));
app.use('/api/auth', require('./Routes/Auth'));
app.use('/api/user', require('./Routes/User'));
app.use('/api/category', require('./Routes/Category'));
app.use('/api/expense', require('./Routes/Expense'));


// Error Handlers
app.use('*', require('./Middleware/notFoundHandler'));
app.use(require('./Middleware/errorHandler'));
