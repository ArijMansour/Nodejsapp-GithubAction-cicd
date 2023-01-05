// const express = require("express");
// const router = express.Router();
// // Load Controllers
// const {
//   sendMessageController,
//   allMessageController,
// } = require("../controllers/message.controller");
// const { validSign } = require("../helper/valid");

// const authJwt = require("../middlewares/authJwt");

// //ADMIN ROUTES:
// router.post("/send", [authJwt.verifyToken], sendMessageController);
// router.get(
//   "/all/:chatId",
//   [authJwt.verifyToken],
//   allMessageController
// );

// module.exports = router;

const {
  addMessage,
  getMessages,
} = require("../controllers/message.controller");
const authJwt = require("../middlewares/authJwt");

const router = require("express").Router();

router.post("/", addMessage);

router.get("/:chatId", getMessages);
module.exports = router;
