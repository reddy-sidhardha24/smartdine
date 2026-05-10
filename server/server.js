const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");
const menuRoutes = require("./routes/menuRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/menu", menuRoutes);
app.use("/api/auth", authRoutes);

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      message: "SmartDine Backend Running",
      databaseTime: result.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Database connection failed",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});