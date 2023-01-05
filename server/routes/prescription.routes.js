const express = require("express");
const router = express.Router();
// Load Controllers
const {
  addPrescriptionController,
  updatePrescriptionController,
  removePrescriptionController,
  getAllPrescriptionsController,
  myPrescriptionController,
} = require("../controllers/prescription.controller");

const authJwt = require("../middlewares/authJwt");

//ADMIN ROUTES:
router.post(
  "/add",
  upload.array("multiple_resources"),
  [authJwt.verifyToken],
  addPrescriptionController
);

/**************************UPDATE PROFILE PATIENT*************************************** */
router.put("/update/:id", [authJwt.verifyToken], updatePrescriptionController);
router.delete(
  "/delete/:id",

  [authJwt.verifyToken],
  removePrescriptionController
);

router.get(
  "/prescriptions",
  [authJwt.verifyToken],
  getAllPrescriptionsController
);

router.get("/myprescription", [authJwt.verifyToken], myPrescriptionController);

module.exports = router;
