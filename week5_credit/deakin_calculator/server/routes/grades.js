// server/routes/grades.js
const express = require("express");
const router = express.Router();
const gradesController = require("../controllers/gradesController");

router.post("/", gradesController.submitGrades);

module.exports = router;
