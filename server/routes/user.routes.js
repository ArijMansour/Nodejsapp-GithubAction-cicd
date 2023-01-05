const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
// Load Controllers
const {
  addAdminController,
  adminBoardController,
  patientBoardController,
  updateProfileController,
  getConnectedUsers,
  updateProfileAdminController,
  getDataController,
  changePasswordController,
  getAllPatients,
  getUserByIdController,
  getAllPharmacies,
  getAllUsers,
  updateProfilePictureController,
  updateProfilePatientController,
  updateProfilePharmacyController,
  searchUserController,
  followUser,
  unfollowUser,
  getUser,
  getUserProfile,
  createShipperController,
  getShippers,
  getShipper,
  updateShipper,
  deleteShipper,
} = require("../controllers/user.controller");
const { validSign } = require("../helper/valid");

const authJwt = require("../middlewares/authJwt");

//ADMIN ROUTES:
router.post(
  "/addAdmin",
  [authJwt.verifyToken, isAdmin],
  validSign,
  addAdminController
);

/**************************UPDATE PROFILE PATIENT*************************************** */
router.put(
  "/updateProfilePatient/:id",
  [authJwt.verifyToken],
  updateProfilePatientController
);

/**************************UPDATE PROFILE PHARMACY*************************************** */
router.put(
  "/updateProfilePharmacy/:id",
  [authJwt.verifyToken],
  updateProfilePharmacyController
);

/**************************UPDATE PROFILE ADMIN*************************************** */
router.put(
  "/updateProfileAdmin/:id",
  [authJwt.verifyToken],
  updateProfileAdminController
);

/**************************UPDATE PICTURE PROFILE*************************************** */
router.put(
  "/updateProfilePicture/:id",
  upload.single("image"),
  [authJwt.verifyToken],
  updateProfilePictureController
);
/**************************CHANGE PASSWORD*************************************** */

router.put("/changepassword", [authJwt.verifyToken], changePasswordController);

/**************************PATIENT SPACE*************************************** */

router.get(
  "/PatientBoard",
  [authJwt.verifyToken, isPatient],
  patientBoardController
);

router.get("/getData", getDataController);
router.get(
  "/profile",

  [authJwt.verifyToken],

  getUserProfile
);

/**************************ADMIN SPACE*************************************** */

router.get("/AdminBoard", [authJwt.verifyToken, isAdmin], adminBoardController);

//CRUD ROUTES
/**************************getAllPatients *************************************** */
router.get("/getAllPatients", [authJwt.verifyToken, isAdmin], getAllPatients);

router.put("/:id/follow", followUser);
router.put("/:id/unfollow", unfollowUser);

/**************************getAllPharmacies *************************************** */
router.get("/getAllPharmacies", [authJwt.verifyToken], getAllPharmacies);

/**************************getAllUsers *************************************** */
router.get("/getAllUsers", getAllUsers);
router.get("/getUser/:id", getUser);

/**************************getUserById *************************************** */
router.get("/getUserById/:id", getUserByIdController);

/**************************SearchUsers *************************************** */
router.get("/search", [authJwt.verifyToken], searchUserController);

router.post("/createShipper", [authJwt.verifyToken], createShipperController);
router.get("/getShippers", [authJwt.verifyToken], getShippers);
router.get("/getShipper/:id", [authJwt.verifyToken], getShipper);
router.put("/updateShipper/:id", [authJwt.verifyToken], updateShipper);
router.delete("/deleteShipper/:id", [authJwt.verifyToken], deleteShipper);

module.exports = router;
