const router = require('express').Router();
const cartController = require('../controllers/cartController');
const ratingController = require('../controllers/ratingController');
const {verifyTokenAndAuthorization} = require('../middleware/verifyToken');

// Use the correct function names
router.post("/", verifyTokenAndAuthorization, ratingController.addRating);
router.get("/", verifyTokenAndAuthorization, rating);


module.exports = router;
