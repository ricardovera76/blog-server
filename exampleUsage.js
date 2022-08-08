const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./util/database");
const {
  AuthUser,
  CreateAUser,
  GetAllUsers,
  GetUserData,
  SendMessage,
  GetChatData,
  CreateAPost,
  GetPosts,
  GetPostsDashboard,
  UpdatePost,
  DeleteAPost,
} = require("./util/requests");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  const data = await GetAllUsers();
  res.send(data);
});

app.get("/dashboard", async (req, res) => {
  const data = await GetPostsDashboard();
  res.send(data);
});

app.get("/posts", async (req, res) => {
  const data = await GetPosts();
  res.send(data);
});
app.post("/posts", async (req, res) => {
  const postData = req.body;
  await CreateAPost(postData);
  res.send("ok");
});
app.put("/posts", async (req, res) => {
  const data = req.body;
  await UpdatePost(data);
  res.send("ok");
});
app.delete("/posts", async (req, res) => {
  const { post_id } = req.body;
  await DeleteAPost(post_id);
  res.send("ok");
});
app.get("/chats/:id", async (req, res) => {
  const data = await GetChatData(req.params.id);
  res.send(data);
});

app.post("/chats/:id", async (req, res) => {
  const messageData = req.body;
  console.log(messageData);
  await SendMessage(messageData);
  res.send("ok");
});

app.post("/signup", async (req, res) => {
  const userData = req.body;
  await CreateAUser(userData);
  res.send("ok");
});

app.post("/signin", async (req, res) => {
  const userData = req.body;
  const chatArray = [];
  const [dbUser] = await AuthUser(userData.email);
  if (dbUser === undefined || dbUser?.password !== userData.password) {
    return res.status(401).send({
      code: 401,
      message: "The combination of email and password does not exist",
    });
  }
  const chats = await GetUserData(dbUser.user_id);
  chats.forEach((chat) => chatArray.push(chat.chat_name));
  const enteredUserData = {
    name: dbUser.u_name,
    email: dbUser.email,
    id: dbUser.user_id,
    chats: chatArray,
    userName: dbUser.user_name,
    ipAddress: dbUser.ip_address,
    isAdmin: dbUser.is_admin,
  };
  res.send(enteredUserData);
});

app.listen(3000, () => {
  connection.connect();
  console.log("app running at http://localhost:3000");
});
