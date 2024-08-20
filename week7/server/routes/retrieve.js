const express = require("express");
const router = express.Router();
const retrieveController = require("../controllers/retrieveController");

router.post("/", retrieveController.retrieveGrades);

module.exports = router;
