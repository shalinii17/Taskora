const express = require("express");
const cors = require("cors");
require("dotenv").config();

const tasksRoutes = require("./routes/tasksRoutes");
const pool = require("./config/db");
const authRoutes = require("./routes/authRoutes");





const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", tasksRoutes);


app.get("/", (req, res) => {
  res.send("Taskora API is running...");
});

const PORT = process.env.PORT || 5000;


pool.connect()
  .then(() => console.log("PostgreSQL connected successfully"))
  .catch(err => console.error("Database connection error:", err));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
