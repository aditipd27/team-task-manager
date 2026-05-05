const Project = require("../models/project");

// CREATE PROJECT
exports.createProject = async (req, res) => {
  try {
    const { title, description, members } = req.body;

    const project = await Project.create({
      title,
      description,
      members,
      createdBy: req.user.id
    });

    res.status(201).json({
      msg: "Project created",
      project
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// GET PROJECTS (for logged-in user)
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user.id
    }).populate("members", "name email");

    res.json(projects);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};