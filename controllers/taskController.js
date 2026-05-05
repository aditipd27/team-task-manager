const Task = require("../models/Task");

// ================= CREATE TASK =================
exports.createTask = async (req, res) => {
  try {
    const { title, description, project, assignedTo, dueDate } = req.body;

    const existingTask = await Task.findOne({ title, project });

    if (existingTask) {
      return res.status(400).json({ msg: "Task already exists" });
    }

    const task = await Task.create({
      title,
      description,
      project,
      assignedTo,
      dueDate
    });

    res.status(201).json({
      msg: "Task created",
      task
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ================= GET TASKS =================
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId })
      .populate("assignedTo", "name email");

    res.json(tasks);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ================= UPDATE TASK =================
exports.updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json({
      msg: "Task updated",
      task
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};