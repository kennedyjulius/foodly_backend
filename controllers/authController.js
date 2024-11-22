const User = require('../models/User');
const UserVerification = require('../models/UserVerification');
const bcrypt = require('bcrypt');
const generateVerificationLink = require('../utils/generateVerificationLink');
const sendEmail = require('../utils/smtpFunction');

module.exports = {
    signUp: async (req, res) => {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        try {
            // Check if email exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "Email is already registered." });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
            });
            await newUser.save();

            // Generate verification link
            const { verificationLink, hash } = await generateVerificationLink(newUser.userId);

            // Save verification details
            const userVerification = new UserVerification({
                userId: newUser.userId,
                uniqueString: hash,
                expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
            });
            await userVerification.save();

            // Send email
            await sendEmail(email, verificationLink);

            res.status(201).json({ message: "Signup successful! Check your email for verification." });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "Invalid credentials." });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: "Invalid credentials." });
            }

            if (!user.verified) {
                return res.status(400).json({ message: "Account not verified. Check your email." });
            }

            res.status(200).json({ message: "Login successful!", userId: user.userId });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};
