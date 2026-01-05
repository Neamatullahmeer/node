const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    city: {
        type: String,
        required: true,
    },
    work: {
        type: String,
        enum: ['employed', 'unemployed', 'student', 'retired'],
        required: true,
    },
});


const person = mongoose.model('Person', personSchema);

module.exports = person;
