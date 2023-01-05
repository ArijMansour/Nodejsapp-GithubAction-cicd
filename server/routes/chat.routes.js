const {
  createChat,
  userChats,
  findChat,
} = require("../controllers/chat.controller");

const express = require("express");
const router = express.Router();

router.post("/", createChat);
router.get("/:userId", userChats);
router.get("/find/:firstId/:secondId", findChat);

module.exports = router;
