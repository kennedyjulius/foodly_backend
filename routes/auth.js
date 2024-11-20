const router = require('express').Router();
const authController = require('../controllers/authController');

// Use the correct function names
router.post("/register", authController.createUser);
router.post("/login", authController.loginUser);
//router.get('/api/users/verify/:code', authController.verifyAccount);
//router.get("/random", categoryController.getRandomCategories);

module.exports = router;