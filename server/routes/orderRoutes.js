const express = require("express");
const router = express.Router();

const pool = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");


// CREATE ORDER
router.post("/", authMiddleware, async (req, res) => {
  try {

    const { items, total } = req.body;

    const userId = req.user.id;

    const newOrder = await pool.query(
      `
      INSERT INTO orders (user_id, items, total)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [userId, JSON.stringify(items), total]
    );

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder.rows[0]
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
});


// GET USER ORDERS
router.get("/", authMiddleware, async (req, res) => {
  try {

    const userId = req.user.id;

    const orders = await pool.query(
      `
      SELECT * FROM orders
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [userId]
    );

    res.status(200).json(orders.rows);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }
});

module.exports = router;