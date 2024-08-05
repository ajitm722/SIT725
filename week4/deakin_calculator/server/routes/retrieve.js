const express = require("express");
const router = express.Router();
const { getDB } = require("../database");

router.post("/", async (req, res) => {
  try {
    const studentId = req.body.studentId;
    const db = getDB();
    const result = await db.collection("grades").findOne({ studentId });

    if (result) {
      res.json({
        studentId: result.studentId,
        totalMarks: result.totalMarks,
        grade: result.grade,
      });
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
