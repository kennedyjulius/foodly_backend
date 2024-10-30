const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const generateOtp = require('../utils/otp_generator');
const sendEmail = require('../utils/smtp_function');

module.exports = {
    // Register User with OTP
    createUser: async (req, res) => {
        const { username, email, password } = req.body;

        // Validate email and password
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) return res.status(400).json({ message: "Invalid email" });
        if (password.length < 8) return res.status(400).json({ message: "Password too short" });

        try {
            // Check if email already exists
            const emailExists = await User.findOne({ email });
            if (emailExists) return res.status(400).json({ message: "Email already registered" });

            // Generate and store OTP
            const otp = generateOtp();
            const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.SECRET).toString();

            // Create new user
            const newUser = new User({ username, email, password: encryptedPassword, otp });
            await newUser.save();

            // Send OTP email
            await sendEmail(email, otp);

            res.status(201).json({ message: "User created, check your email for OTP" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Verify Account using OTP
    verifyAccount: async (req, res) => {
        const { email, otp } = req.body; // Adjust to use email and OTP from body

        try {
            const user = await User.findOne({ email });

            // Validate OTP and user status
            if (!user) return res.status(404).json({ message: "User not found" });
            if (user.verification) return res.status(400).json({ message: "Account already verified" });
            if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

            // Update user verification status
            user.verification = true;
            user.otp = "none"; // Invalidate OTP
            await user.save();

            res.status(200).json({ message: "Account verified successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Login User with password decryption
    loginUser: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ message: "User not found" });

            const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET).toString(CryptoJS.enc.Utf8);
            if (decryptedPassword !== password) return res.status(400).json({ message: "Invalid password" });

            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
            res.status(200).json({ message: "Login successful", token });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
