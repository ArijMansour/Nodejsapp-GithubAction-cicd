const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

const User = require("../models/user.model");
const ROLES = require("../config/roles.config");
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
verifyToken = async (req, res, next) => {
  let token = req.headers.authorization;
  console.log(token);

  if (!token) {
    return res.status(403).json({
      message: "No token provided!",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      console.log(decoded);
      return res.status(401).send({ message: "unauthorized" });
    }

    req.user = await User.findById(decoded.id).select("-password");

    next();
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) return res.status(500).send({ message: err });

    if (user.role === ROLES.ADMIN) {
      next();
      return;
    } else {
      res.status(403).send({ message: "Require Admin Role!" });
      return;
    }
  });
};

isPharmacy = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) return res.status(500).send({ message: err });

    if (user.role === ROLES.PHARMACY) {
      next();
      return;
    } else {
      res.status(403).send({ message: "Require Pharmacy Role!" });
      return;
    }
  });
};

isPatient = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) return res.status(500).send({ message: err });

    if (user.role === ROLES.PATIENT) {
      next();
      return;
    } else {
      res.status(403).send({ message: "Require PATIENT Role!" });
      return;
    }
  });
};

uploadImages = function (pathArray) {
  return new Promise((resolve, reject) => {
    const urlArray = [];
    pathArray.forEach((path) => {
      cloudinary.uploader.upload(path, (error, result) => {
        if (error) {
          reject(error);
        } else {
          urlArray.push({ img: result.url });
          if (urlArray.length === pathArray.length) {
            resolve(urlArray);
          }
        }
      });
    });
  });
};

requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    console.log(user);
  } else {
    return res.status(400).json({ message: "Authorization required" });
  }
  next();
  //jwt.decode()
};

patientMiddleware = (req, res, next) => {
  if (req.user.role !== "PATIENT") {
    return res.status(400).json({ message: "User access denied" });
  }
  next();
};

adminMiddleware = (req, res, next) => {
  if (req.user.role !== "PHARMACY") {
    return res.status(400).json({ message: "pharmacy access denied" });
  }
  next();
};

superAdminMiddleware = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(400).json({ message: "Admin access denied" });
  }
  next();
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

upload = multer({ storage });

const authJwt = {
  verifyToken,
  isAdmin,
  requireSignin,
  isPatient,
  superAdminMiddleware,
  adminMiddleware,
  patientMiddleware,
  isPharmacy,
  uploadImages,
  upload,
};

module.exports = authJwt;
