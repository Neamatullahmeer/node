const mongoose = require('mongoose');
require("dotenv").config();


//const mongoDbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/mydatabase';

const db = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = db;