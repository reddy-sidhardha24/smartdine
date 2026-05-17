const express = require("express");

const router = express.Router();

const pool = require("../config/db");

const authMiddleware = require("../middleware/authMiddleware");


// ==============================
// PLACE ORDER
// ==============================

router.post("/", authMiddleware, async (req, res) => {
  try {

    const {
      items,
      total,
      address,
      phone,
      paymentMethod,
    } = req.body;

    const userId = req.user.id;

    const newOrder = await pool.query(
      `
      INSERT INTO orders
      (
        user_id,
        items,
        total,
        address,
        phone,
        payment_method,
        status
      )

      VALUES ($1, $2, $3, $4, $5, $6, $7)

      RETURNING *
      `,
      [
        userId,
        JSON.stringify(items),
        total,
        address,
        phone,
        paymentMethod,
        "Preparing",
      ]
    );

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder.rows[0],
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// ==============================
// GET USER ORDERS
// ==============================

router.get("/", authMiddleware, async (req, res) => {
  try {

    const userId = req.user.id;

    const orders = await pool.query(
      `
      SELECT *
      FROM orders
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [userId]
    );

    res.json(orders.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// ==============================
// GET ALL ORDERS (ADMIN)
// ==============================

router.get("/all", async (req, res) => {
  try {

    const orders = await pool.query(`
      SELECT *
      FROM orders
      ORDER BY created_at DESC
    `);

    res.json(orders.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// ==============================
// UPDATE ORDER STATUS
// ==============================

router.put("/:id", async (req, res) => {
  try {

    const { status } = req.body;

    const updatedOrder = await pool.query(
      `
      UPDATE orders
      SET status = $1
      WHERE id = $2
      RETURNING *
      `,
      [status, req.params.id]
    );

    res.json(updatedOrder.rows[0]);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// ==============================
// ADMIN DASHBOARD STATS
// ==============================

router.get("/admin/stats", async (req, res) => {
  try {

    const totalOrdersResult = await pool.query(
      "SELECT COUNT(*) FROM orders"
    );

    const revenueResult = await pool.query(
      "SELECT SUM(total) FROM orders"
    );

    const pendingResult = await pool.query(
      "SELECT COUNT(*) FROM orders WHERE status != 'Delivered'"
    );

    const deliveredResult = await pool.query(
      "SELECT COUNT(*) FROM orders WHERE status = 'Delivered'"
    );

    res.json({
      totalOrders: totalOrdersResult.rows[0].count,

      totalRevenue:
        revenueResult.rows[0].sum || 0,

      pendingOrders:
        pendingResult.rows[0].count,

      deliveredOrders:
        deliveredResult.rows[0].count,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch stats",
    });
  }
});


module.exports = router;