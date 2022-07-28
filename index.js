require("dotenv").config();
const app = require("./app");
const { socketServer } = require("./routes/chats");
const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const port = process.env.PORT || 3001;
const sequelize = require("./database/database");

const main = async () => {
  try {
    await sequelize.authenticate();
    console.log("connection to db has been established");
    server.listen(port, () => {
      console.log(`App running on port ${port} @ http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to db", error);
  }
};
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

main();

socketServer(io);
