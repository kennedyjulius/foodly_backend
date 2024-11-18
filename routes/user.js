const router = require('express').Router();
const userController = require('../controllers/userController');

// Adjust middleware to skip verification for OTP-related routes
const { verifyTokenAndAuthorization, verifyToken } = require('../middleware/verifyToken');

// Routes for user management
router.get("/", verifyTokenAndAuthorization, userController.getUser);

// OTP Verification should NOT require authentication
router.post("/api/users/verify/:otp", userController.verifyAccount);

router.get("")
 // Use POST and receive OTP in the body

// Phone verification route

router.delete("/verify_phone/:phone", verifyTokenAndAuthorization, userController.verifyPhone);

module.exports = router;
