const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController'); // Ensure the path is correct

// Define routes
router.post("/", foodController.addFood); // Check if addFood exists in foodController
router.get("/:id", foodController.getFoodById);
router.get("/random/:code", foodController.getRandomFood);
router.get("/search/:search", foodController.searchFoods);
router.get("/:category/:code", foodController.getFoodsByCategoryAndCode);
router.get("/recommendation/:code", foodController.getRandomFood);
router.get("/restaurant-foods/:id", foodController.getFoodsByRestaurant);

module.exports = router;
