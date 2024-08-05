// server/calculator.js
module.exports = {
  calculateGrade: (totalMarks) => {
    if (totalMarks >= 80) {
      return "HD (High Distinction)";
    } else if (totalMarks >= 70) {
      return "D (Distinction)";
    } else if (totalMarks >= 60) {
      return "C (Credit)";
    } else if (totalMarks >= 50) {
      return "P (Pass)";
    } else {
      return "N (Fail)";
    }
  },
};

