const connection = require("./db");

const createUsersTable = () => {
  connection.query(
    'CREATE TABLE users (user_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE, user_alias VARCHAR(255) NOT NULL, user_name VARCHAR(255) NOT NULL UNIQUE, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, user_type VARCHAR(1) NOT NULL DEFAULT "s", ip_address VARCHAR(255) NOT NULL, user_subjects JSON DEFAULT (JSON_ARRAY()));'
  );
  connection.query(
    `INSERT INTO users (user_id,user_alias,user_name,email,password,ip_address) VALUES (1,"test", "testing1","test@test.com","123456789","192.168.2.2");`
  );
};

const createSubjectsTable = () => {
  connection.query(
    "CREATE TABLE subjects (subject_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE, subject_name VARCHAR(255) NOT NULL, subj_users_signed JSON NOT NULL DEFAULT (JSON_ARRAY()));"
  );
};

const createChatsTable = () => {
  connection.query(
    "CREATE TABLE chats (chat_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE, chat_name VARCHAR(255) NOT NULL UNIQUE, chat_users_signed JSON NOT NULL DEFAULT (JSON_ARRAY()), chat_messages JSON NOT NULL DEFAULT (JSON_ARRAY()), chat_subj_id INT NOT NULL, FOREIGN KEY (chat_subj_id) REFERENCES subjects(subject_id));"
  );
};

const createPostsTable = () => {
  connection.query(
    "CREATE TABLE posts (post_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL UNIQUE, post_title VARCHAR(255) NOT NULL, post_body TEXT NOT NULL, post_cover TEXT, post_vid TEXT, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, post_user_id INT NOT NULL, post_subject_id INT NOT NULL, post_replies JSON NOT NULL DEFAULT (JSON_ARRAY()), FOREIGN KEY (post_user_id) REFERENCES users(user_id),FOREIGN KEY (post_subject_id) REFERENCES subjects(subject_id));"
  );
};

const createTables = () => {
  console.log("creating db tables...");
  console.log("creating users table...");
  createUsersTable();
  console.log("creating Subjects table...");
  createSubjectsTable();
  console.log("creating chats table...");
  createChatsTable();
  console.log("creating Posts table...");
  createPostsTable();
};

createTables();

// process.exit(0);
