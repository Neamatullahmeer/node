const mongoose = require('mongoose');
console.log('Connecting to MongoDB...');

const mangoDbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/mydatabase';

const db = async () => {
    try {
        await mongoose.connect(mangoDbUrl);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = db;