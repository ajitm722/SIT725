// server/routes/grades.js
const express = require("express");
const router = express.Router();
const { getDB } = require("../database");
const calculator = require("../calculator");

router.post("/", async (req, res) => {
  const { studentId, task1, task2, task3, task4, task5 } = req.body;

  if (!studentId) {
    return res.status(400).json({ error: "Student ID is required" });
  }

  const totalMarks =
    parseInt(task1, 10) +
    parseInt(task2, 10) +
    parseInt(task3, 10) +
    parseInt(task4, 10) +
    parseInt(task5, 10);
  const grade = calculator.calculateGrade(totalMarks);

  try {
    const db = getDB();
    await db.collection("grades").updateOne(
      { studentId },
      { $set: { totalMarks, grade } },
      { upsert: true } // Create a new document if one doesn't exist
    );
    res.json({ studentId, totalMarks, grade });
  } catch (error) {
    console.error("Error storing data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
