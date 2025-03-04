const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, 'minimum length show be greater than 3 characters'],
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, 'minimum length show be greater than 3 characters'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: 'this is bio'
    },
}, { timestamps: true })

module.exports = mongoose.model('users', userSchema)

