const {
  GetMyOrders,
  getOrderById,
  GetOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
  addorderitems,
  assignOrderToShipperController,
  cancelOrder,
} = require("../controllers/order.controller");
const { verifyToken } = require("../middlewares/authJwt");

const express = require("express");
const router = express.Router();

router.post("/", verifyToken, addorderitems);
router.get("/getOrders", verifyToken, GetOrders);

router.get("/myorders", verifyToken, GetMyOrders);

router.get("/:id", getOrderById);
router.put("/:id/pay", verifyToken, updateOrderToPaid);

router.put("/:id/deliver", verifyToken, updateOrderToDelivered);
router.put("/assignToShipper", verifyToken, assignOrderToShipperController);


router.put("/cancelOrder/:id", verifyToken, cancelOrder)

module.exports = router;
