const express = require("express");
const { requireSignin, adminMiddleware } = require("../../middlewares/authJwt");
const {
  updateOrder,
  getCustomerOrders,
} = require("../../controllers/pharmacy/order.admin");
const router = express.Router();

router.post(`/order/update`, requireSignin, adminMiddleware, updateOrder);
router.post(
  `/order/getCustomerOrders`,
  requireSignin,
  adminMiddleware,
  getCustomerOrders
);

module.exports = router;
