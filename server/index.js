const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const port = 4500 || process.env.PORT;

 const users = [{}];   // array of object

app.use(cors());
app.get("/", (req, res) => {
  res.send("SERVER IS WORKING");
});

const server = http.createServer(app);

const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("New Connection");

  socket.on("joined", ({ user }) => {   // on means to receive data
     users[socket.id] = user;
      console.log(`${user} has joined `);
       socket.broadcast.emit("userJoined", {
         user: "Admin",
         message: ` ${users[socket.id]} has joined`,
         // message: ` ${user} has joined`,
       });

      
    socket.emit("welcome", {
      user: "Admin",
       message: `Welcome to the chat,${users[socket.id]} `,
      //message: `Welcome to the chat,${user} `,
    });
      
     
      
  });

  socket.on("message", ({ message, id }) => {
     io.emit("sendMessage", { user: users[id], message, id });
  });

  socket.on("disconnection", () => {
    socket.broadcast.emit("leave", {
      user: "Admin",
      message: `${users[socket.id]}  has left`,
    });
    console.log(`user left`);
  });
});

server.listen(port, () => {
  console.log(`Working on ${port}`);
});
