const mongoose = require("mongoose");

const { Schema } = mongoose;

const TasksSchema = new Schema({
  task_title: {
    type: String,
    Required: true,
  },
  task_description: {
    type: String,
    Required: true,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  task_createdAt: {
    type: Date,
    default: Date.now(),
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const Task = mongoose.model("tasks", TasksSchema);
module.exports = Task;
