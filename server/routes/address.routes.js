const express = require("express");
const { verifyToken, patientMiddleware } = require("../middlewares/authJwt");
const {
  addAddress,
  getAddress,
  updateAddress,
  getAllAddress,
} = require("../controllers/address.controller");
const router = express.Router();

router.post("/user/address/create", verifyToken, addAddress);

router.get("/user/address/getaddress", verifyToken, getAddress);
router.get("/user/address/getpharmacyadd", getAllAddress);

getAllAddress;
router.put("/user/address/updateaddress/:id", verifyToken, updateAddress);

module.exports = router;
