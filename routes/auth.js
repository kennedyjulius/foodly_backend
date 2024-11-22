const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signUp);
router.post('/login', authController.login);

module.exports = router;



// const router = require('express').Router();
// const authController = require('../controllers/authController');

// Use the correct function names
// router.post("/register", authController.createUser);
// router.post("/login", authController.loginUser);
//router.get('/api/users/verify/:code', authController.verifyAccount);
//router.get("/random", categoryController.getRandomCategories);

// const express = require("express");
// const authController = require("../controllers/authController");
// const router = express.Router();

// router.post("/signup", authController.SignUp);

// module.exports = router;
// const express = require("express");
// const verificationController = require("../controllers/verificationController");
// const router = express.Router();

// router.get("/:userId/:hash", verificationController.VerifyUser);

// module.exports = router;



