const express = require("express");

const router = express.Router();

const pool = require("../config/db");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

// ADMIN LOGIN

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    // CHECK EMPTY

    if (!email || !password) {

      return res.status(400).json({
        message: "All fields are required",
      });

    }

    // FIND ADMIN

    const admin = await pool.query(
      `
      SELECT *
      FROM admins
      WHERE email = $1
      `,
      [email]
    );

    // ADMIN NOT FOUND

    if (admin.rows.length === 0) {

      return res.status(401).json({
        message: "Invalid credentials",
      });

    }

    // PASSWORD CHECK

    const validPassword =
      await bcrypt.compare(
        password,
        admin.rows[0].password
      );

    if (!validPassword) {

      return res.status(401).json({
        message: "Invalid credentials",
      });

    }

    // CREATE TOKEN

    const token = jwt.sign(
      {
        id: admin.rows[0].id,
        email: admin.rows[0].email,
        role: "admin",
      },
      "smartdine_secret_key",
      {
        expiresIn: "7d",
      }
    );

    // SUCCESS

    res.json({
      message: "Admin login successful",
      token,
      admin: {
        id: admin.rows[0].id,
        email: admin.rows[0].email,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });

  }

});

module.exports = router;