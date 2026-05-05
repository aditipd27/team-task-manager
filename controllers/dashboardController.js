const Task = require("../models/Task");

exports.getDashboard = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();

    const todo = await Task.countDocuments({ status: "Todo" });
    const inProgress = await Task.countDocuments({ status: "In Progress" });
    const done = await Task.countDocuments({ status: "Done" });

    const overdue = await Task.countDocuments({
      dueDate: { $lt: new Date() },
      status: { $ne: "Done" }
    });

    res.json({
      totalTasks,
      todo,
      inProgress,
      done,
      overdue
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};