require("dotenv").config();
const app = require("./app");
const { socketServer } = require("./routes/chats");
const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const port = process.env.PORT || 3001;
const connection = require("./database/database");

server.listen(port, () => {
  connection.connect();
  console.log(`App running on port ${port} @ http://localhost:${port}`);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

socketServer(io);
