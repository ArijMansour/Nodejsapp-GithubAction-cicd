const express = require("express");
const router = express.Router();
// Load Controllers
const {
  addCategoryController,
  updateCategoryController,
  removeCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  searchCategoryController,
} = require("../controllers/category.controller");
const { validSign } = require("../helper/valid");

const authJwt = require("../middlewares/authJwt");

//ADMIN ROUTES:
router.post("/category", [authJwt.verifyToken], addCategoryController);

/**************************UPDATE PROFILE PATIENT*************************************** */
router.put("/category/:id", [authJwt.verifyToken], updateCategoryController);
router.delete("/category/:id", [authJwt.verifyToken], removeCategoryController);

router.get(
  "/categories",
  // [authJwt.verifyToken, isPharmacy],
  getAllCategoriesController
);

/**************************getUserById *************************************** */
router.get("/category/:id", getCategoryByIdController);
router.get("/searchCategory", searchCategoryController);

module.exports = router;
