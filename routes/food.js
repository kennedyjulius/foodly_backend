const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController'); // Ensure the path is correct
const { verifyVendor } = require('../middleware/verifyToken');

// Define routes
router.post("/", verifyVendor,foodController.addFood); // Check if addFood exists in foodController
router.get("/:id", foodController.getFoodById);
router.get("/byCode/:code", foodController.getAllFoodsByCode);
router.get("/search/:search", foodController.searchFoods);
router.get("/:category/:code", foodController.getFoodsByCategoryAndCode);
router.get("/recommendation/:code", foodController.getRandomFood);
//router.get("/restaurant-foods/:id", foodController.getFoodByRestaurant);

module.exports = router;
