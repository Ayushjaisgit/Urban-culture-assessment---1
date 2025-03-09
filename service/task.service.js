const Task = require("../models/tasks.schema");

const getUserTasks = async (req, res) => {
  try {
    const getTokenData = req.user;
    const limit = Number(req.query?.limit || 20);
    const skip = Number(((req.query?.page || 1) - 1) * limit);

    const getUserTasks = await Task.find({
      author: getTokenData._id,
      is_deleted: false,
    })
      .limit(limit)
      .skip(skip);
    if (!getUserTasks.length) {
      return res.status(404).json({ message: "No Tasks found!" });
    }

    const page_count = await Task.countDocuments({
      author: getTokenData._id,
    });
    totalPages = Math.ceil(page_count / limit);

    return res
      .status(200)
      .json({ data: getUserTasks, pages_available: totalPages });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
};

exports.getUserTasks = getUserTasks;

const createTasks = async (req, res) => {
  try {
    const getTokenData = req.user;
    const { task_title, task_description } = req.body;

    const saveTask = await Task.create({
      author: getTokenData._id,
      task_createdAt: new Date(),
      task_title: task_title,
      task_description: task_description,
    });

    if (!saveTask) {
      return res.status(400).json({ message: "Unable to Create Task!" });
    }

    return res.status(200).json({ message: "Task uploaded successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
};
exports.createTasks = createTasks;

const updateTasks = async (req, res) => {
  try {
    const getTokenData = req.user;
    const { id } = req.params;
    const { task_title, task_description } = req.body;

    const userTasks = await Task.findOneAndUpdate(
      {
        _id: id,
        author: getTokenData._id,
        is_deleted: false,
      },
      {
        task_title: task_title,
        task_description: task_description,
      }
    );

    if (!userTasks) {
      return res.status(400).json({ message: "No Task found!" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
};
exports.updateTasks = updateTasks;

const deleteTask = async (req, res) => {
  try {
    const getTokenData = req.user;
    const { id } = req.params;
    const userTasks = await Task.findOneAndUpdate(
      {
        _id: id,
        author: getTokenData._id,
        is_deleted: false,
      },
      { is_deleted: true }
    );

    if (!userTasks) {
      return res.status(400).json({ message: "No Task found!" });
    }

    return res.status(200).json({ message: "Task deleted successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
};
exports.deleteTask = deleteTask;
