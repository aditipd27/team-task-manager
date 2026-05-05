const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");

// DEBUG (temporary)
console.log("createTask:", taskController.createTask);
console.log("getTasks:", taskController.getTasks);
console.log("updateTaskStatus:", taskController.updateTaskStatus);

// CREATE TASK
router.post("/", taskController.createTask);

// GET TASKS
router.get("/:projectId", taskController.getTasks);

// UPDATE TASK
router.put("/:id", taskController.updateTaskStatus);

module.exports = router;