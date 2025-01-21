const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    name: String,
    role: {
        type: String,
        enum: ['student', 'instructor'],
        default: 'student',
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema);