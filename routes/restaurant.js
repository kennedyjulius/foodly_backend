const router = require('express').Router();
const restaurantController = require('../controllers/restaurantController');

// Use the correct function names
router.post("/", restaurantControllerController.addRestaurant);

router.get("/:code", restaurantControllerController.getRandomRestaurants);

router.get("/all/:code", restaurantController.getAllNearByRestaurants);

router.get("/byId/:id", restaurantController.getRestaurantById);

module.exports = router;