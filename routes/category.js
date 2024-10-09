const router = require('express').Router();
const categoryController = require('../controllers/CategoryController');

router.post("/", categoryController.categoryController);
router.get("/", categoryController.getAllCategories);
router.get("/random", categoryController.getRandomCategories);


module.exports = router;