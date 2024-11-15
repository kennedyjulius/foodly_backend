const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    otp: {type: Number},
    password: {type: String, required: true},
    verification: {type: Boolean, default: false},
    phone: {type: String, default: "0123456789"},
    phoneVerification: {type: Boolean, default: false},
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
    },
    userType: {type: String, required: true, default: "Client", enum: ["Client", "Admin", "Vendor", "Driver"]},
    profile: {type: String, default: 'https://d326fntlu7tb1e.cloudfront.net/uploads/bdec9d7d-0544-4fc4-823d-3b898f6dbbbf-vinci_03.jpeg'},
}, { timestamps: true });  // Corrected option placement

module.exports = mongoose.model('User', UserSchema);
