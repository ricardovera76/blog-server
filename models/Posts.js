const mongoose = require("mongoose");

const PostsSchema = new mongoose.Schema(
  {
    sender_name: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      required: true,
      default: new Date(),
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    tags: [String],
    _id: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const PostsModel = mongoose.model("posts", PostsSchema);

module.exports = PostsModel;
