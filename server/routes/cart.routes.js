const express = require("express");
const {
  addItemToCart,
  addToCart,
  getCartItems,
  removeCartItems,
} = require("../controllers/cart.controller");
const { verifyToken, patientMiddleware } = require("../middlewares/authJwt");
const router = express.Router();

router.post("/cart/addtocart", verifyToken, patientMiddleware, addItemToCart);
//router.post('/user/cart/addToCartByLogin', requireSignin, userMiddleware, addToCart);
router.post(
  "/cart/getCartItems",
  requireSignin,
  patientMiddleware,
  getCartItems
);
//new update
router.post(
  "/cart/removeItem",
  requireSignin,
  patientMiddleware,
  removeCartItems
);

module.exports = router;
