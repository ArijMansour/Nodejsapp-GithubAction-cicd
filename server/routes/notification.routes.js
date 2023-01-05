const express = require("express");
const {
  getnotification,
  addnotification,
  deletenotification,
  updatenotification,
  getnotificationsPharmacy,
} = require("../controllers/notification.controller");
const router = express.Router();

//GET ALL NOTIFICATION By UESER
router.get("/:id", getnotification);
router.get("/get/:id", getnotificationsPharmacy);

//ADD NEW NOTIFICATION
router.post("/add/", addnotification);
//PUT  NOTIFICATION
router.put("/update/:id", updatenotification);
//Delete  NOTIFICATION
router.delete("/delete/:id", deletenotification);

module.exports = router;
