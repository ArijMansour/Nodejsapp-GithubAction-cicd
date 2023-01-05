const express = require("express");
const router = express.Router();
// Load Controllers
const {
  addStockController,
  updateStockController,
  removeStockController,
  getAllStocksController,
  getStockByIdController,
  searchStockController,
} = require("../controllers/stock.controller");
const { validSign } = require("../helper/valid");

const authJwt = require("../middlewares/authJwt");

//ADMIN ROUTES:
router.post("/addStock", [authJwt.verifyToken], addStockController);

/**************************UPDATE PROFILE PATIENT*************************************** */
router.put("/:id", [authJwt.verifyToken], updateStockController);
router.delete("/delete/:id", [authJwt.verifyToken], removeStockController);

router.get(
  "/getStocks",
  // [authJwt.verifyToken, isPharmacy],
  getAllStocksController
);

/**************************getUserById *************************************** */
router.get("/getStock/:id", getStockByIdController);
router.get("/searchStock", searchStockController);

module.exports = router;
