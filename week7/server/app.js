// server/app.js
const express = require("express");
const bodyParser = require("body-parser");
const { connectDB } = require("./models/database");
const app = express();
const path = require("path"); // Import the 'path' module
const http = require("http"); // Add this line
const socketIo = require("socket.io"); // Add this line

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

// Create HTTP server and integrate Socket.IO
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("A student connected");

  socket.on("message", (msg) => {
    console.log("Received message from student:", msg);
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("Student disconnected");
  });
});

connectDB().then(() => {
  server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});
