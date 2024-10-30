const router = require('express').Router();
const cartController = require('../controllers/cartController');
const {verifyTokenAndAuthorization} = require('../middleware/verifyToken');

// Use the correct function names
router.post("/", verifyTokenAndAuthorization, cartController.addProductToCart);

router.get("/decrement", verifyTokenAndAuthorization, cartController.decrementProductQty);

router.delete("/:id", verifyTokenAndAuthorization, cartController.removeCartItem);

router.get("/", verifyTokenAndAuthorization, cartController.getCart);

router.get("/count", verifyTokenAndAuthorization, cartController.getCartCount);



module.exports = router;
