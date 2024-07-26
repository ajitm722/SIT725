const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const calculator = require("./calculator");
const port = 8080;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));

app.post("/submit", (req, res) => {
  const task1 = parseInt(req.body.task1, 10);
  const task2 = parseInt(req.body.task2, 10);
  const task3 = parseInt(req.body.task3, 10);
  const task4 = parseInt(req.body.task4, 10);
  const task5 = parseInt(req.body.task5, 10);
  const totalMarks = task1 + task2 + task3 + task4 + task5;

  // Determine grade based on totalMarks
  let grade;
  if (totalMarks >= 80) {
    grade = "HD (High Distinction)";
  } else if (totalMarks >= 70) {
    grade = "D (Distinction)";
  } else if (totalMarks >= 60) {
    grade = "C (Credit)";
  } else if (totalMarks >= 50) {
    grade = "P (Pass)";
  } else {
    grade = "N (Fail)";
  }
  console.log(
    `Received Total Marks: ${totalMarks} and Final Grade: ${grade}. :)`
  );
  res.json({ totalMarks, grade });
});

// app.get("/home", (req, res) => {
//   res.send(calculator.home);
// });

// app.get("/about", (req, res) => {
//   res.send(calculator.about);
// });

// app.use((req, res) => {
//   res.status(404).send(calculator.notfound);
// });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
