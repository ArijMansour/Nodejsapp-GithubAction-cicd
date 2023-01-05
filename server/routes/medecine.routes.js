const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
// Load Controllers
const {
  addMedecineController,
  updateMedecineController,
  removeMedecineController,
  getAllMedecinesController,
  getMedecineByIdController,
  searchMedecineController,
  assignCatToProdController,
  getCategoryController,
  createMedecineReviewController,
  getMedecinesController,
  getMedecineController,
  getAllMedecinesPatientController,
} = require("../controllers/medecine.controller");
const { validSign } = require("../helper/valid");

const authJwt = require("../middlewares/authJwt");

//ADMIN ROUTES:
router.post(
  "/medecine",
  upload.array("multiple_resources"),
  [authJwt.verifyToken],
  addMedecineController
);

/**************************UPDATE PROFILE PATIENT*************************************** */
router.put("/medecine/:id", [authJwt.verifyToken], updateMedecineController);
router.delete("/medecine/:id", [authJwt.verifyToken], removeMedecineController);

router.get("/medecines", [authJwt.verifyToken], getAllMedecinesController);
router.get(
  "/medecinesPatient",
  // [authJwt.verifyToken, isPharmacy],getAllMedecinesPatientController
  getAllMedecinesPatientController
);

/**************************getUserById *************************************** */
router.get("/medecine/:id", getMedecineByIdController);

/**************************getCategory *************************************** */

router.get("/categoryMedecine", getCategoryController);

router.get("/searchMedecine", searchMedecineController);
router.put("/assign", assignCatToProdController);

router.get("/getMedecines", getMedecinesController);
router.post(
  "/:id/reviews",
  [authJwt.verifyToken],
  createMedecineReviewController
);

router.get("/:id", getMedecineController);

module.exports = router;
