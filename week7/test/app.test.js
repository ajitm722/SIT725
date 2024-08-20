const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
const app = require("../server/app"); // Path to your app.js
chai.use(chaiHttp);

describe("GET /home", () => {
  it("should return the home page", (done) => {
    chai
      .request(app)
      .get("/home")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("POST /submit", () => {
  it("should submit marks and return a grade", (done) => {
    // Define marks for testing
    const marks = { task1: 15, task2: 18, task3: 17, task4: 20, task5: 16 };

    // Calculate the total marks from the defined marks
    const totalMarks = Object.values(marks).reduce(
      (sum, mark) => sum + mark,
      0
    );

    // Send the request to the /submit endpoint with the marks and student ID
    chai
      .request(app)
      .post("/submit")
      .send({ studentId: "123", ...marks })
      .end((err, res) => {
        // Check if the response status is 200 OK
        expect(res).to.have.status(200);

        // Check if the response contains the correct totalMarks
        expect(res.body).to.have.property("totalMarks").that.equals(totalMarks);

        // Determine the expected grade based on the totalMarks
        let expectedGrade;
        if (totalMarks >= 80) {
          expectedGrade = "HD (High Distinction)";
        } else if (totalMarks >= 70) {
          expectedGrade = "D (Distinction)";
        } else if (totalMarks >= 60) {
          expectedGrade = "C (Credit)";
        } else if (totalMarks >= 50) {
          expectedGrade = "P (Pass)";
        } else {
          expectedGrade = "N (Fail)";
        }

        // Check if the response contains the correct grade
        expect(res.body).to.have.property("grade").that.equals(expectedGrade);

        done();
      });
  });
});

describe("POST /retrieve", () => {
  it("should retrieve marks and grade for a given student ID", (done) => {
    chai
      .request(app)
      .post("/retrieve")
      .send({ studentId: "123" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("studentId");
        expect(res.body).to.have.property("totalMarks");
        expect(res.body).to.have.property("grade");
        done();
      });
  });
});
