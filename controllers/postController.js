const {
  getPosts: getLimited,
  getAllPosts: getAll,
  createPost: createP,
  updatePost: updateP,
  deletePost: deleteP,
} = require("../database/queries");

const getPosts = async (limited) => {
  if (limited) {
    return await getLimited();
  }
  return await getAll();
};

const createPost = async (title, body, userId) => {
  await createP({ title, body, userId });
  return "post created";
};

const updatePost = async (valueToUpdate, newValue, postID) => {
  await updateP({ value: newValue, type: valueToUpdate, id: postID });
  return "post updated";
};

const deletePost = async (id) => {
  await deleteP(id);
  return "post deleted";
};

module.exports = { getPosts, createPost, updatePost, deletePost };
