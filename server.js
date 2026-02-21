const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const validateUser = require("./middleware/auth");
const { canJoin } = require("./services/roomService");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

app.get("/voice", validateUser, (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", socket => {

  socket.on("join-room", ({ roomId, user }) => {

    if (!canJoin(roomId, user.rank)) {
      socket.emit("access-denied");
      return;
    }

    socket.join(roomId);
    socket.to(roomId).emit("user-connected", user.name);

  });

});

server.listen(process.env.PORT || 3000, () =>
  console.log("Voice Server Running")
);