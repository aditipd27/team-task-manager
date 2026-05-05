require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/task"));
app.use("/api/projects", require("./routes/project"));
app.use("/api/dashboard", require("./routes/dashboard"));

// ✅ Test route (ADD HERE)
app.get("/test", (req, res) => {
  console.log("Test route hit");
  res.send("Test working");
});

// ✅ Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

// ✅ Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});