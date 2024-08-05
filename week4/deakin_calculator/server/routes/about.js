// server/routes/about.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send("Deakin Calculator will add your marks and give you your grade. :)");
});

module.exports = router;

