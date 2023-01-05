const express = require("express");
const router = express.Router();

const authJwt = require("../middlewares/authJwt");

// Load Controllers
const {
  registerController,
  registerPatientController,
  activationController,
  signinController,
  activationPatientController,
  sendOTPController,
  forgotPasswordController,
  verifyOTPController,
  resetPasswordController,
  signOutController,
  getLoggedInUser,
  signinShipperController,
} = require("../controllers/auth.controller");

const {
  validSign,
  validLogin,
  validSendOtp,
  validSignPatient,
  forgotPasswordValidator,
  resetPasswordValidator,
  validSignShipper,
} = require("../helper/valid");

router.post("/register", validSign, registerController);
router.post("/register-patient", validSignPatient, registerPatientController);

router.post("/signin", validLogin, signinController);
router.post("/shipper/signinShipper", signinShipperController);

router.post("/sendotp", validSendOtp, sendOTPController);
router.post("/verifyotp", verifyOTPController);

verifyOTPController;

router.post("/activate", activationController);
router.post("/activate-patient", activationPatientController);
// forgot reset password
router.put(
  "/forgotpassword",
  forgotPasswordValidator,
  forgotPasswordController
);
router.put("/resetpassword", resetPasswordValidator, resetPasswordController);

router.get("/currentUser", getLoggedInUser);

router.post("/signout", signOutController);

module.exports = router;
