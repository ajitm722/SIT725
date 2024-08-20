document.addEventListener("DOMContentLoaded", function () {
  // Initialize tooltips and modals
  const tooltippedElems = document.querySelectorAll(".tooltipped");
  M.Tooltip.init(tooltippedElems, {
    enterDelay: 200,
    exitDelay: 100,
    position: "top",
    html: true,
    inDuration: 500,
    outDuration: 300,
  });

  const submitModalElems = document.querySelectorAll("#submitModal");
  M.Modal.init(submitModalElems);

  const retrieveModalElems = document.querySelectorAll("#retrieveModal");
  M.Modal.init(retrieveModalElems);

  // Socket.io integration
  const socket = io();

  socket.on("message", (msg) => {
    const messagesList = document.getElementById("messages");
    const messageElement = document.createElement("li");
    messageElement.textContent = msg;
    messagesList.appendChild(messageElement);
  });

  window.sendMessage = function () {
    const messageInput = document.getElementById("messageInput").value;
    console.log("Sending message:", messageInput); // Debugging line
    socket.emit("message", messageInput);
    document.getElementById("messageInput").value = "";
  };

  document
    .getElementById("gradeForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const formData = new FormData(event.target);
      const data = new URLSearchParams(formData);

      const response = await fetch("/submit", {
        method: "POST",
        body: data,
      });

      try {
        const result = await response.json();
        const instance = M.Modal.getInstance(
          document.getElementById("submitModal")
        );
        document.getElementById(
          "submitResult"
        ).textContent = `Received Total Marks: ${result.totalMarks} and Final Grade: ${result.grade}.`;
        instance.open();
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    });

  document
    .getElementById("retrieveForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const formData = new FormData(event.target);
      const data = new URLSearchParams(formData);

      const response = await fetch("/retrieve", {
        method: "POST",
        body: data,
      });

      try {
        const result = await response.json();
        const instance = M.Modal.getInstance(
          document.getElementById("retrieveModal")
        );
        document.getElementById(
          "retrieveResult"
        ).textContent = `Student ID: ${result.studentId}, Total Marks: ${result.totalMarks}, Final Grade: ${result.grade}.`;
        instance.open();
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    });
});
