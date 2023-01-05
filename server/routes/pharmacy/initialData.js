const express = require("express");
const { requireSignin, adminMiddleware } = require("../../middlewares/authJwt");
const { initialData } = require("../../controllers/pharmacy/initialData");
const router = express.Router();

router.post("/initialdata", requireSignin, adminMiddleware, initialData);

module.exports = router;
