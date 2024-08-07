// server/app.js
const express = require("express");
const bodyParser = require("body-parser");
const { connectDB } = require("./models/database");
const app = express();
const path = require("path"); // Import the 'path' module
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "../view")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../view/index.html"));
});

// Import routes
const homeRouter = require("./routes/home");
const aboutRouter = require("./routes/about");
const gradesRouter = require("./routes/grades");
const retrieveRoutes = require("./routes/retrieve");

// Use routes
app.use("/home", homeRouter);
app.use("/about", aboutRouter);
app.use("/submit", gradesRouter);
app.use("/retrieve", retrieveRoutes);

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});
