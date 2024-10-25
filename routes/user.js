const router = require('express').Router();
const userController = require('../controllers/userController');
const {verifyTokenAndAuthorization} = require ('../middleware/verifyToken');

// Use the correct function names

router.get("/", verifyTokenAndAuthorization,userController.getUser);
router.get("/verify/:otp", verifyTokenAndAuthorization,userController.verifyAccount);
router.delete("/verify_phone/:phone", verifyTokenAndAuthorization,userController.verifyAccount);

module.exports = router;