const router = require('express').Router();
const userController = require('../controllers/userController');

// Use the correct function names

router.get("/", userController.getUser);
router.get("/verify/:otp", userController.verifyAccount);
router.delete("/verify_phone/:phone", userController.verifyAccount);

module.exports = router;