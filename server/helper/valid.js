const { check } = require("express-validator");
exports.validSign = [
  check("username", "username is required")
    .notEmpty()
    .isLength({
      min: 4,

      max: 40,
    })
    .withMessage("username must be between 4 to 32 characters"),

  // check("pharmacyAddress", "pharmacyAdress is required")
  //   .notEmpty()
  //   .isLength({
  //     min: 7,
  //     max: 90,
  //   })
  //   .withMessage("pharmacyAddress must be between 7 to 32 characters"),

  check("email").isEmail().withMessage("Must be a valid email address"),

  check("password", "password is required").notEmpty(),
  check("password")
    .isLength({
      min: 6,
    })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("password must contain a number"),

  check("confirm").custom((value, { req }) => {
    if (req.body.password !== req.body.confirm) {
      throw new Error("Password confirmation does not match password");
    }

    return true;
  }),
];

exports.validSignPatient = [
  check("username", "username is required")
    .notEmpty()
    .isLength({
      min: 4,

      max: 16,
    })
    .withMessage("username must be between 4 to 32 characters"),

  check("firstName", "firstName is required")
    .notEmpty()
    .isLength({
      min: 4,

      max: 16,
    })
    .withMessage("firstName must be between 4 to 32 characters"),

  check("lastName", "lastName is required")
    .notEmpty()
    .isLength({
      min: 4,

      max: 16,
    })
    .withMessage("lastName must be between 4 to 32 characters"),

  check("email").isEmail().withMessage("Must be a valid email address"),

  check("password", "password is required").notEmpty(),
  check("password")
    .isLength({
      min: 6,
    })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("password must contain a number"),

  check("confirm").custom((value, { req }) => {
    if (req.body.password !== req.body.confirm) {
      throw new Error("Password confirmation does not match password");
    }

    return true;
  }),
];

exports.validLogin = [
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password", "password is required").notEmpty(),
  check("password")
    .isLength({
      min: 6,
    })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("password must contain a number"),
];

exports.forgotPasswordValidator = [
  check("email")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Must be a valid email address"),
];

exports.resetPasswordValidator = [
  check("newPassword")
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be at least  6 characters long"),
];

exports.validSendOtp = [
  check("phone").isMobilePhone().withMessage("Must be a valid phone number"),
];

exports.validSignShipper = [
  check("phone").isMobilePhone().withMessage("Must be a valid phone number"),
];
