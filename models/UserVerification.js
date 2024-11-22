// models/UserVerification.js

const mongoose = require('mongoose');

const userVerificationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    uniqueString: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model('UserVerification', userVerificationSchema);
