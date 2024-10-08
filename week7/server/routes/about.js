// server/routes/about.js
const express = require("express");
const router = express.Router();
const aboutController = require("../controllers/aboutController");

router.get("/", aboutController.getAbout);

module.exports = router;
