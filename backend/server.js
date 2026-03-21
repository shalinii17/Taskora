const express = require("express");
const cors = require("cors");
require("dotenv").config();

const tasksRoutes = require("./routes/tasksRoutes");
const authRoutes = require("./routes/authRoutes");
const pool = require("./config/db");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", tasksRoutes);

app.get("/", (req, res) => {
  res.send("Taskora API is running...");
});

pool.on("error", (err) => {
  console.error("Unexpected DB error:", err);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});