const connection = require("../database/database");

const createSubject = async (data) => {
  try {
    await connection
      .promise()
      .execute(
        `INSERT INTO subjects (subject_name) VALUES ("${data.subjectName}");`
      );
    const [[sub]] = await connection
      .promise()
      .execute(
        `SELECT * FROM subjects WHERE subject_name="${data.subjectName}";`
      );
    await connection
      .promise()
      .execute(
        `INSERT INTO chats (chat_name, chat_subj_id) VALUES ("${data.chatName}", ${sub.subject_id});`
      );

    return {
      error: false,
      code: 200,
      message: `subject ${data.subjectName} and chat ${data.chatName} created!`,
    };
  } catch (e) {
    let err = e;
    if (e.sql !== undefined) {
      err = {
        error: true,
        code: 1500,
        ERROR_SQL_CODE: e.code,
        ERROR_SQL_N: e.errno,
        SQL_ERROR_MESSAGE: e.sqlMessage,
        message: "AN ERROR HAS OCCURRED",
        SQL_LINE_FAULT: e.sql,
      };
      return err;
    }
    return { error: true, code: 800, message: err?.message };
  }
};

const getAllSubjects = async () => {
  try {
    const [subs] = await connection
      .promise()
      .execute(`SELECT * FROM subjects;`);
    if (subs.length === 0) {
      return {
        error: true,
        code: 406,
        message: "theres no subjects yet or error trying to get the subjects",
      };
    }
    return {
      error: false,
      code: 200,
      message: `success!`,
      data: subs,
    };
  } catch (e) {
    let err = e;
    if (e.sql !== undefined) {
      err = {
        error: true,
        code: 1500,
        ERROR_SQL_CODE: e.code,
        ERROR_SQL_N: e.errno,
        SQL_ERROR_MESSAGE: e.sqlMessage,
        message: "AN ERROR HAS OCCURRED",
        SQL_LINE_FAULT: e.sql,
      };
      return err;
    }
    return { error: true, code: 800, message: err?.message };
  }
};

const addParticipants = async (data) => {
  try {
    const [user] = await connection
      .promise()
      .execute(`SELECT * FROM users WHERE user_name="${data.userName}";`);
    const [sub] = await connection
      .promise()
      .execute(
        `SELECT * FROM subjects WHERE subject_name="${data.subjectName}";`
      );
    const [chat] = await connection
      .promise()
      .execute(`SELECT * FROM chats WHERE chat_subj_id=${sub[0].subject_id};`);
    if (user.length === 0 || sub.length === 0 || chat.length === 0) {
      const result =
        chat.length === 0
          ? "chat"
          : user.length === 0
          ? "user"
          : sub.length === 0
          ? "subject"
          : "";
      return {
        error: true,
        code: 406,
        message: `${result} does not exists`,
      };
    }

    const userSubLen = user[0].user_subjects.length;
    const subjLen = sub[0].subj_users_signed.length;
    const chatUserLen = chat[0].chat_users_signed.length;
    const subject = JSON.stringify({
      subject_id: sub[0].subject_id,
      subject_name: sub[0].subject_name,
    });
    const newUser = JSON.stringify({
      user_id: user[0].user_id,
      user_name: user[0].user_name,
      user_alias: user[0].user_alias,
    });
    await connection.promise().execute(
      `UPDATE users SET user_subjects = JSON_SET(user_subjects,'$[${userSubLen}]', '${subject}') WHERE user_id=${user[0].user_id};
       UPDATE subjects SET subj_users_signed = JSON_SET(subj_users_signed,'$[${subjLen}]', '${newUser}') WHERE subject_id=${sub[0].subject_id};
       UPDATE chats SET chat_users_signed = JSON_SET(chat_users_signed,'$[${chatUserLen}]', '${newUser}') WHERE chat_id=${chat[0].chat_id};
      `
    );
    return {
      error: false,
      code: 200,
      message: `participant ${data.userName} added to chat and subject!`,
    };
  } catch (e) {
    let err = e;
    if (e.sql !== undefined) {
      err = {
        error: true,
        code: 1500,
        ERROR_SQL_CODE: e.code,
        ERROR_SQL_N: e.errno,
        SQL_ERROR_MESSAGE: e.sqlMessage,
        message: "AN ERROR HAS OCCURRED",
        SQL_LINE_FAULT: e.sql,
      };
      return err;
    }
    return { error: true, code: 800, message: err?.message };
  }
};

const deleteSubject = async (subjectName) => {
  try {
    const [users] = await connection.promise().execute(`SELECT * FROM users;`);
    const [sub] = await connection
      .promise()
      .execute(`SELECT * FROM subjects WHERE subject_name="${subjectName}";`);
    if (sub.length === 0) {
      return {
        error: true,
        code: 406,
        message: "subject does not exists",
      };
    }
    const subject = JSON.stringify({
      subject_id: sub[0].subject_id,
      subject_name: sub[0].subject_name,
    });
    users.map(async (user) => {
      if (user.user_subjects.indexOf(subject) !== -1) {
        const idx = user.user_subjects.indexOf(subject);
        try {
          await connection
            .promise()
            .execute(
              `UPDATE users SET user_subjects = JSON_REMOVE(user_subjects, '$[${idx}]') WHERE user_id=${user.user_id}`
            );
        } catch (e) {
          let err = e;
          if (e.sql !== undefined) {
            err = {
              error: true,
              code: 1500,
              ERROR_SQL_CODE: e.code,
              ERROR_SQL_N: e.errno,
              SQL_ERROR_MESSAGE: e.sqlMessage,
              message: "AN ERROR HAS OCCURRED",
              SQL_LINE_FAULT: e.sql,
            };
            return err;
          }
          return { error: true, code: 800, message: err?.message };
        }
      }
    });
    await connection.promise().execute(`
      DELETE FROM chats WHERE chat_subj_id="${sub[0].subject_id}";
      DELETE FROM subjects WHERE subject_id="${sub[0].subject_id}";`);
    return {
      error: false,
      code: 200,
      message: `removed subject ${subjectName} and its chat!`,
    };
  } catch (e) {
    let err = e;
    if (e.sql !== undefined) {
      err = {
        error: true,
        code: 1500,
        ERROR_SQL_CODE: e.code,
        ERROR_SQL_N: e.errno,
        SQL_ERROR_MESSAGE: e.sqlMessage,
        message: "AN ERROR HAS OCCURRED",
        SQL_LINE_FAULT: e.sql,
      };
      return err;
    }
    return { error: true, code: 800, message: err?.message };
  }
};

const removeParticipants = async (data) => {
  try {
    const [user] = await connection
      .promise()
      .execute(`SELECT * FROM users WHERE user_name="${data.userName}";`);
    const [sub] = await connection
      .promise()
      .execute(
        `SELECT * FROM subjects WHERE subject_name="${data.subjectName}";`
      );
    const [chat] = await connection
      .promise()
      .execute(`SELECT * FROM chats WHERE chat_subj_id=${sub[0].subject_id};`);
    if (user.length === 0 || sub.length === 0 || chat.length === 0) {
      const result =
        chat.length === 0
          ? "chat"
          : user.length === 0
          ? "user"
          : sub.length === 0
          ? "subject"
          : "";
      return {
        error: true,
        code: 406,
        message: `${result} does not exists`,
      };
    }

    const subjsArr = sub[0].subj_users_signed;
    const userArr = user[0].user_subjects;
    const chatsArr = chat[0].chat_users_signed;

    let ca = "";
    chatsArr.map((value) => {
      if (value.indexOf(data.userName) !== -1) {
        ca = value;
      }
    });
    let sa = "";
    subjsArr.map((value) => {
      if (value.indexOf(data.userName) !== -1) {
        sa = value;
      }
    });
    let ua = "";
    userArr.map((value) => {
      if (value.indexOf(data.subjectName) !== -1) {
        ua = value;
      }
    });
    const idxChat = chatsArr.indexOf(ca);
    const idxSubj = subjsArr.indexOf(sa);
    const idxUser = userArr.indexOf(ua);
    if (idxChat !== -1 || idxUser !== -1 || idxSubj !== -1) {
      await connection.promise().execute(
        `UPDATE users SET user_subjects = JSON_REMOVE(user_subjects, '$[${idxUser}]') WHERE user_id=${user[0].user_id};
         UPDATE subjects SET subj_users_signed = JSON_REMOVE(subj_users_signed, '$[${idxSubj}]') WHERE subject_id=${sub[0].subject_id};
         UPDATE chats SET chat_users_signed = JSON_REMOVE(chat_users_signed, '$[${idxChat}]') WHERE chat_id=${chat[0].chat_id};
        `
      );
      return {
        error: false,
        code: 200,
        message: `user ${data.userName} removed from subject ${data.subjectName} and chat ${chat[0].chat_name}`,
      };
    }

    return {
      error: true,
      code: 800,
      message: "an error occurred",
    };
  } catch (e) {
    let err = e;
    if (e.sql !== undefined) {
      err = {
        error: true,
        code: 1500,
        ERROR_SQL_CODE: e.code,
        ERROR_SQL_N: e.errno,
        SQL_ERROR_MESSAGE: e.sqlMessage,
        message: "AN ERROR HAS OCCURRED",
        SQL_LINE_FAULT: e.sql,
      };
      return err;
    }
    return { error: true, code: 800, message: err?.message };
  }
};

module.exports = {
  createSubject,
  getAllSubjects,
  addParticipants,
  deleteSubject,
  removeParticipants,
};

/*
ex usage:

app.post("/subjects", async (req, res) => {
  const values = req.body;
  if (values.subjectName === undefined) {
    res.send({ error: true, code: 400, message: "cannot create subject" });
    return;
  }
  const data = await createSubject(values);
  res.send(data);
});
body:
{
  chatName,
  subjectName
}

app.get("/subjects", async (req, res) => {
  const data = await getAllSubjects();
  res.send(data);
});
body:
NO BODY

app.put("/subjects/user", async (req, res) => {
  const values = req.body;
  const data = await addParticipants(values);
  res.send(data);
});
body:
{
  userName,
  subjectName
}

app.delete("/subjects", async (req, res) => {
  const subjectName = req.body.subjectName;
  const data = await deleteSubject(subjectName);
  res.send(data);
});
body:
{
  subjectName
}

app.delete("/subjects/user", async (req, res) => {
  const values = req.body;
  const data = await removeParticipants(values);
  res.send(data);
});
body:
{
  userName,
  subjectName
}


*/
