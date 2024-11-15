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
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password too short" });
        }

        try {
            // Check if email already exists
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: "Email already registered" });
            }

            // Generate and store OTP
            const otp = generateOtp();
            console.log("Generated OTP:", otp); // Debugging OTP
            const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.SECRET || "default_secret").toString();

            // Create new user
            const newUser = new User({
                username,
                email,
                password: encryptedPassword,
                otp,
            });
            await newUser.save();

            // Send OTP email
            try {
                await sendEmail(email, otp);
                console.log("Email sent to:", email);
            } catch (error) {
                console.error("Email sending error:", error);
                return res.status(500).json({ message: "Failed to send OTP email" });
            }

            res.status(201).json({ message: "User created, check your email for OTP" });
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ message: error.message });
        }
    },

    // Verify Account using OTP
    verifyAccount: async (req, res) => {
        const { email, otp } = req.body;

        console.log("Verification Request - Email:", email, "OTP:", otp);

        try {
            const user = await User.findOne({ email });
            console.log("User found:", user);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            if (user.verification) {
                return res.status(400).json({ message: "Account already verified" });
            }
            if (String(user.otp) !== Number(otp)) {
                console.log("Invalid OTP - Stored:", user.otp, "Provided:", otp);
                return res.status(400).json({ message: "Invalid OTP" });
            }

            // Update user verification status
            user.verification = true;
            user.otp = "none"; // Invalidate OTP
            await user.save();

            res.status(200).json({ message: "Account verified successfully" });
        } catch (error) {
            console.error("Error verifying account:", error);
            res.status(500).json({ message: error.message });
        }
    },

    // Login User with password decryption
    loginUser: async (req, res) => {
        const { email, password } = req.body;

        console.log("Login Request - Email:", email);

        try {
            const user = await User.findOne({ email });
            console.log("User found:", user);

            if (!user) {
                return res.status(400).json({ message: "User not found, kindly consider signing up" });
            }

            const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET || "default_secret").toString(CryptoJS.enc.Utf8);
            if (decryptedPassword !== password) {
                console.log("Invalid password for user:", email);
                return res.status(400).json({ message: "Invalid password" });
            }

            const token = jwt.sign(
                { id: user._id, email: user.email },
                process.env.JWT_SECRET || "default_jwt_secret",
                { expiresIn: "1d" }
            );
            if (!user.verification) {
                return res.status(400).json({ 
                    message: "Account not verified. Please verify your email first",
                    needsVerification: true 
                });
            }

            res.status(200).json({ message: "Login successful", token });
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ message: error.message });
        }
    },
};
