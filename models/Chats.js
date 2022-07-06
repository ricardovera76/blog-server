const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    sender_id: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      required: true,
      default: new Date(),
    },
    text: {
      type: String,
      required: true,
    },
    _id: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const ChatSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    participants: [String],
    messages: [MessageSchema],
  },
  { _id: false }
);

const ChatModel = mongoose.model("chats", ChatSchema);

module.exports = ChatModel;
