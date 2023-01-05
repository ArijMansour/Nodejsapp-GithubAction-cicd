const express = require("express");
const router = express.Router();
const {
  approveRequestController,
  getAllRequestController,
  updateRequestController,
  getRequestController,
  deleteRequestController,
} = require("../controllers/request.controller");
const authJwt = require("../middlewares/authJwt");

// router.post("/approveRequest", [authJwt.verifyToken], approveRequestController);
router.post("/approveRequest", approveRequestController);

router.get("/all", getAllRequestController);
router.get("/one/:id", getRequestController);
// router.put("/update/:id", updateRequestController);
router.delete("/delete/:id", deleteRequestController);

module.exports = router;
