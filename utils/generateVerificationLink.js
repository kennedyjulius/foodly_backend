// utils/generateVerificationLink.js

const crypto = require('crypto');
const uuid = require('uuid').v4;

const generateVerificationLink = (userId) => {
    const uniqueString = uuid();  // Generate unique identifier
    const hash = crypto.createHash('sha256').update(uniqueString).digest('hex');  // Hash the unique string

    const verificationLink = `${process.env.BASE_URL}/users/verify/${userId}/${hash}`;

    return { verificationLink, hash };
};

module.exports = generateVerificationLink;
