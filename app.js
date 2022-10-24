const express = require("express");
const cors = require("cors");
const adminRoute = require("./routes/admin");
const { router: chatsRoute } = require("./routes/chats");
const dashboardRoute = require("./routes/dashboard");
const postsRoute = require("./routes/posts");
const signinRoute = require("./routes/signin");
const signupRoute = require("./routes/signup");
const userRoute = require("./routes/user");

const app = express();

// middleware / database connection
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// API routes
app.use("/dashboard", dashboardRoute);
app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/chats", chatsRoute);
app.use("/posts", postsRoute);
app.use("/signin", signinRoute);
app.use("/signup", signupRoute);

module.exports = app;
