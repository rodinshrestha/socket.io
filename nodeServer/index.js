//Node server which will handle socket io connection

const io = require("socket.io")(8000);
if (io) {
  console.log("asd");
}
const users = {};

io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    //console.log("New user", name);
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      name: users[socket.id],
      message: message,
    });
  });

  socket.on("disconnect", (message) => {
    socket.broadcast.emit("leave", users[socket.id]);
  });
});
