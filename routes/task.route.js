const express = require("express");
const router = express.Router();
const taskService = require("../service/task.service");
const fetchUser = require("../middleware/auth");

// Create task route
router.post("/task", fetchUser, taskService.createTasks);

// Retrieve all task route
router.get("/task", fetchUser, taskService.getUserTasks);

// Update task route
router.patch("/task/:id", fetchUser, taskService.updateTasks);

// Delete task route
router.delete("/task/:id", fetchUser, taskService.deleteTask);

module.exports = router;
