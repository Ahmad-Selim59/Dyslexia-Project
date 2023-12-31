const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  conversation: {
    type: Schema.Types.ObjectId,
    ref: "conversations",
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

const Message = mongoose.model("messages", MessageSchema);

module.exports = Message;
