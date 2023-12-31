const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GlobalMessageSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
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

const GlobalMessage = mongoose.model("global_messages", GlobalMessageSchema);

module.exports = GlobalMessage;
