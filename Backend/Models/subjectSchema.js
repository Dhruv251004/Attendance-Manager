const mongoose = require("mongoose");
const { Schema } = mongoose;
const subjectSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  subject: {
    type: String,
    required: true,
  },
  present: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

const subject = mongoose.model("subjects", subjectSchema);
module.exports = subject;
