const connection = require("../database/database");

const createPost = async (data) => {
  try {
    const [user] = await connection
      .promise()
      .execute(`SELECT * FROM users WHERE user_name="${data.userName}"`);
    const [sub] = await connection
      .promise()
      .execute(
        `SELECT * FROM subjects WHERE subject_name="${data.subjectName}"`
      );
    if (user.length === 0 || sub.length === 0) {
      const result =
        user.length === 0 ? "user" : sub.length === 0 ? "subject" : "";
      return {
        error: true,
        code: 406,
        message: `${result} does not exists`,
      };
    }
    await connection
      .promise()
      .execute(
        `INSERT INTO posts (post_title ,post_body ,post_vid ,post_cover ,post_user_id ,post_subject_id ) VALUES ("${data.title}","${data.body}","${data.vidLink}","${data.cover}",${user[0].user_id}, ${sub[0].subject_id});`
      );
    return {
      error: false,
      code: 200,
      message: `post added!`,
    };
  } catch (e) {
    let error = e;
    if (e.sql !== undefined) {
      error = {
        ERROR_SQL_CODE: e.code,
        ERROR_SQL_N: e.errno,
        SQL_ERROR_MESSAGE: e.sqlMessage,
        MESSAGE: "AN ERROR HAS OCCURRED",
        SQL_LINE_FAULT: e.sql,
      };
    }
    return { error: true, code: 800, message: error.message };
  }
};
const replyPost = async (data) => {
  try {
    const [user] = await connection
      .promise()
      .execute(`SELECT * FROM users WHERE user_name="${data.userName}";`);
    const [sub] = await connection
      .promise()
      .execute(
        `SELECT * FROM subjects WHERE subject_name="${data.subjectName}";`
      );
    if (user.length === 0 || sub.length === 0) {
      const result =
        user.length === 0 ? "user" : sub.length === 0 ? "subject" : "";
      return {
        error: true,
        code: 406,
        message: `${result} does not exists`,
      };
    }
    const [post] = await connection
      .promise()
      .execute(
        `SELECT * FROM posts WHERE post_title="${data.title}" AND post_user_id=${user[0].user_id} AND post_subject_id=${sub[0].subject_id};`
      );
    if (post.length === 0) {
      return {
        error: true,
        code: 406,
        message: `post does not exists`,
      };
    }
    const reply = JSON.stringify({
      message: data.message,
      user_name: data.userName,
      user_id: user[0].user_id,
      subject_name: data.subjectName,
      subject_id: sub[0].subject_id,
    });
    const idx = post[0].post_replies.length;
    console.log(idx, reply);
    console.log(post[0]);
    await connection
      .promise()
      .execute(
        `UPDATE posts SET post_replies = JSON_SET(post_replies, '$[${idx}]', '${reply}') WHERE post_id=${post[0].post_id};`
      );
    return {
      error: false,
      code: 200,
      message: `success!`,
      data: post,
    };
  } catch (e) {
    let error = e;
    if (e.sql !== undefined) {
      error = {
        ERROR_SQL_CODE: e.code,
        ERROR_SQL_N: e.errno,
        SQL_ERROR_MESSAGE: e.sqlMessage,
        MESSAGE: "AN ERROR HAS OCCURRED",
        SQL_LINE_FAULT: e.sql,
      };
    }
    return { error: true, code: 800, message: error.message };
  }
};
const updatePost = async (data) => {
  try {
    const [user] = await connection
      .promise()
      .execute(`SELECT * FROM users WHERE user_name="${data.userName}";`);
    const [sub] = await connection
      .promise()
      .execute(
        `SELECT * FROM subjects WHERE subject_name="${data.subjectName}";`
      );
    if (user.length === 0 || sub.length === 0) {
      const result =
        user.length === 0 ? "user" : sub.length === 0 ? "subject" : "";
      return {
        error: true,
        code: 406,
        message: `${result} does not exists`,
      };
    }
    const [post] = await connection
      .promise()
      .execute(
        `SELECT * FROM posts WHERE post_title="${data.title}" AND post_user_id=${user[0].user_id} AND post_subject_id=${sub[0].subject_id};`
      );
    if (post.length === 0) {
      return {
        error: true,
        code: 406,
        message: `post does not exists`,
      };
    }
    await connection
      .promise()
      .execute(
        `UPDATE posts SET post_body = ${data.body},post_vid = ${data.vid} WHERE post_id = ${post[0].post_id};`
      );
    const [newPost] = await connection
      .promise()
      .execute(`SELECT * FROM posts WHERE post_id = ${post[0].post_id}`);
    return {
      error: false,
      code: 200,
      message: `post updated!`,
      data: newPost,
    };
  } catch (e) {
    let error = e;
    if (e.sql !== undefined) {
      error = {
        ERROR_SQL_CODE: e.code,
        ERROR_SQL_N: e.errno,
        SQL_ERROR_MESSAGE: e.sqlMessage,
        MESSAGE: "AN ERROR HAS OCCURRED",
        SQL_LINE_FAULT: e.sql,
      };
    }
    return { error: true, code: 800, message: error.message };
  }
};
const deletePost = async (data) => {
  try {
    const [user] = await connection
      .promise()
      .execute(`SELECT * FROM users WHERE user_name="${data.userName}";`);
    const [sub] = await connection
      .promise()
      .execute(
        `SELECT * FROM subjects WHERE subject_name="${data.subjectName}";`
      );
    if (user.length === 0 || sub.length === 0) {
      const result =
        user.length === 0 ? "user" : sub.length === 0 ? "subject" : "";
      return {
        error: true,
        code: 406,
        message: `${result} does not exists`,
      };
    }
    const [post] = await connection
      .promise()
      .execute(
        `SELECT * FROM posts WHERE post_title="${data.title}" AND post_user_id=${user[0].user_id} AND post_subject_id=${sub[0].subject_id};`
      );
    await connection
      .promise()
      .execute(`DELETE FROM posts WHERE post_id = ${post[0].post_id};`);
    if (post.length === 0) {
      return {
        error: true,
        code: 406,
        message: `post does not exists`,
      };
    }
    return {
      error: false,
      code: 200,
      message: `post deleted!`,
      data: [],
    };
  } catch (e) {
    let error = e;
    if (e.sql !== undefined) {
      error = {
        ERROR_SQL_CODE: e.code,
        ERROR_SQL_N: e.errno,
        SQL_ERROR_MESSAGE: e.sqlMessage,
        MESSAGE: "AN ERROR HAS OCCURRED",
        SQL_LINE_FAULT: e.sql,
      };
    }
    return { error: true, code: 800, message: error.message };
  }
};
const getAllPost = async () => {
  try {
    const [post] = await connection.promise().execute(`SELECT * FROM posts;`);
    if (post.length === 0) {
      return {
        error: true,
        code: 400,
        message: `no posts yet`,
      };
    }
    return {
      error: false,
      code: 200,
      message: `success!`,
      data: post,
    };
  } catch (e) {
    let error = e;
    if (e.sql !== undefined) {
      error = {
        ERROR_SQL_CODE: e.code,
        ERROR_SQL_N: e.errno,
        SQL_ERROR_MESSAGE: e.sqlMessage,
        MESSAGE: "AN ERROR HAS OCCURRED",
        SQL_LINE_FAULT: e.sql,
      };
    }
    return { error: true, code: 800, message: error.message };
  }
};
const getRecentPosts = async () => {
  try {
    const [post] = await connection
      .promise()
      .execute(`SELECT * FROM posts ORDER BY updated_at DESC LIMIT 10;`);
    if (post.length === 0) {
      return {
        error: true,
        code: 406,
        message: `post does not exists`,
      };
    }
    return {
      error: false,
      code: 200,
      message: `success!`,
      data: post,
    };
  } catch (e) {
    let error = e;
    if (e.sql !== undefined) {
      error = {
        ERROR_SQL_CODE: e.code,
        ERROR_SQL_N: e.errno,
        SQL_ERROR_MESSAGE: e.sqlMessage,
        MESSAGE: "AN ERROR HAS OCCURRED",
        SQL_LINE_FAULT: e.sql,
      };
    }
    return { error: true, code: 800, message: error.message };
  }
};
const getFilteredPosts = async (subjectName) => {
  try {
    const [sub] = await connection
      .promise()
      .execute(`SELECT * FROM subjects WHERE subject_name="${subjectName}";`);
    if (sub.length === 0) {
      return {
        error: true,
        code: 406,
        message: `subject does not exists`,
      };
    }
    const [post] = await connection
      .promise()
      .execute(
        `SELECT * FROM posts WHERE post_subject_id=${sub[0].subject_id};`
      );
    if (post.length === 0) {
      return {
        error: true,
        code: 406,
        message: `post does not exists`,
      };
    }
    return {
      error: false,
      code: 200,
      message: `success!`,
      data: post,
    };
  } catch (e) {
    let error = e;
    if (e.sql !== undefined) {
      error = {
        ERROR_SQL_CODE: e.code,
        ERROR_SQL_N: e.errno,
        SQL_ERROR_MESSAGE: e.sqlMessage,
        MESSAGE: "AN ERROR HAS OCCURRED",
        SQL_LINE_FAULT: e.sql,
      };
    }
    return { error: true, code: 800, message: error.message };
  }
};
const getPostData = async (data) => {
  try {
    const [user] = await connection
      .promise()
      .execute(`SELECT * FROM users WHERE user_name="${data.userName}"`);
    const [sub] = await connection
      .promise()
      .execute(
        `SELECT * FROM subjects WHERE subject_name="${data.subjectName}"`
      );
    if (user.length === 0 || sub.length === 0) {
      const result =
        user.length === 0 ? "user" : sub.length === 0 ? "subject" : "";
      return {
        error: true,
        code: 406,
        message: `${result} does not exists`,
      };
    }
    const [post] = await connection
      .promise()
      .execute(
        `SELECT * FROM posts WHERE post_title="${data.title}" AND post_user_id=${user[0].user_id} AND post_subject_id=${sub[0].subject_id}`
      );
    if (post.length === 0) {
      return {
        error: true,
        code: 406,
        message: `post does not exists`,
      };
    }
    return {
      error: false,
      code: 200,
      message: "success!",
      data: {
        ...post[0],
        user_name: data.userName,
        subject_name: data.subjectName,
      },
    };
  } catch (e) {
    let error = e;
    if (e.sql !== undefined) {
      error = {
        ERROR_SQL_CODE: e.code,
        ERROR_SQL_N: e.errno,
        SQL_ERROR_MESSAGE: e.sqlMessage,
        MESSAGE: "AN ERROR HAS OCCURRED",
        SQL_LINE_FAULT: e.sql,
      };
    }
    return { error: true, code: 800, message: error.message };
  }
};

module.exports = {
  createPost,
  replyPost,
  updatePost,
  deletePost,
  getAllPost,
  getRecentPosts,
  getFilteredPosts,
  getPostData,
};

/*

app.post("/posts", async (req, res) => {
  const values = req.body;
  let coverImage;
  let uploadCoverPath;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("no files uploaded");
  }
  coverImage = req.files.cover;
  uploadCoverPath = `${__dirname}/uploads/${values.title}${values.userName}${values.subjectName}${coverImage.name}`;
  coverImage.mv(uploadCoverPath, (err) => {
    if (err) return res.status(500).send(err);
  });
  const value = { ...values, cover: uploadCoverPath };
  const data = await createPost(value);
  res.send(data);
});

app.put("/posts/reply", async (req, res) => {
  const data = req.body;
  const result = await replyPost(data);
  res.send(result);
});
app.post("/posts/data", async (req, res) => {
  const data = req.body;
  const result = await getPostData(data);
  res.send(result);
});

app.post("/posts/cover", async (req, res) => {
  const data = req.body;
  const result = await getPostData(data);
  if (!result.error) {
    res.sendFile(result.data.post_cover);
    return;
  }
  res.send(result);
});
*/
