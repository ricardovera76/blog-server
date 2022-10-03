const connection = require("./database");

console.log("creating db tables...");

console.log("creating Users table...");
connection.query(
  "CREATE TABLE Users (user_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE, u_name VARCHAR(255) NOT NULL, user_name VARCHAR(255) NOT NULL UNIQUE, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, is_admin TINYINT(1) NOT NULL DEFAULT 0, ip_address VARCHAR(255) NOT NULL);"
);
console.log("Users table created...");

console.log("seeding User table...");
connection.query(
  `INSERT INTO Users (user_id,u_name,user_name,email,password,is_admin,ip_address) VALUES (1,"test", "testing1","test@test.com","123456789",1,"192.168.2.2");`
);
console.log("User table Seeded!...");

console.log("creating Chats table...");
connection.query(
  "CREATE TABLE Chats (chat_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE, chat_name VARCHAR(255) NOT NULL);"
);
console.log("Chats table created...");

console.log("creating Posts table...");
connection.query(
  "CREATE TABLE Posts (posts_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE, post_title VARCHAR(255) NOT NULL, post_body TEXT, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, post_user_id INT NOT NULL, FOREIGN KEY (post_user_id) REFERENCES Users(user_id));"
);
console.log("Posts table created...");

console.log("creating Messages table...");
connection.query(
  "CREATE TABLE Messages (message_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE, message_text TEXT NOT NULL, message_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, message_user_id INT NOT NULL, message_chat_id INT NOT NULL, FOREIGN KEY (message_user_id) REFERENCES Users(user_id), FOREIGN KEY (message_chat_id) REFERENCES Chats(chat_id));"
);
console.log("Messages table created...");

console.log("creating UserChats table...");
connection.query(
  "CREATE TABLE UserChats (userchat_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE, userchat_user_id INT NOT NULL, userchat_chat_id INT NOT NULL, FOREIGN KEY (userchat_user_id) REFERENCES Users(user_id), FOREIGN KEY (userchat_chat_id) REFERENCES Chats(chat_id));"
);
console.log("UserChats table created...");

process.exit(0);
