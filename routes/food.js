const router = require('express').Router();
const FoodController = require('../controllers/foodController');

// Use the correct function names
router.post("/", categoryController.createCategory);
router.get("/", categoryController.getAllCategories);
router.get("/random", categoryController.getRandomCategories);

module.exports = router;
