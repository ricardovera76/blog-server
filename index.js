require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3001;
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

// middleware / database connection
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
mongoose.connect(process.env.MONGO_URI);

// API routes
const adminRoute = require("./routes/admin");
const chatsRoute = require("./routes/chats");
const dashboardRoute = require("./routes/dashboard");
const postsRoute = require("./routes/posts");
const signinRoute = require("./routes/signin");
const signupRoute = require("./routes/signup");
app.use("/dashboard", dashboardRoute);
app.use("/admin", adminRoute);
app.use("/chats", chatsRoute);
app.use("/posts", postsRoute);
app.use("/signin", signinRoute);
app.use("/signup", signupRoute);

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("disconnect", () => {
    console.log("User Disconnected | ", socket.id);
  });
});

server.listen(port, () => {
  console.log(`App running on port ${port} @ http://localhost:${port}`);
});
