// server/routes/home.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send("Deakin Calculator - Add your marks, get your grade. :)");
});

module.exports = router;

