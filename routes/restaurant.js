const router = require('express').Router();
const restaurantController = require('../controllers/restaurantController');
const { verifyTokenAndAuthorization } = require('../middlewares/verifyToken');

// Use the correct function names
router.post("/add", verifyTokenAndAuthorization,restaurantController.addRestaurant);

router.get("/:code", restaurantController.getRandomRestaurants);

router.get("/all/:code", restaurantController.getAllNearByRestaurants);

router.get("/byId/:id", restaurantController.getRestaurantById);

module.exports = router;