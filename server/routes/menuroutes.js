const express = require("express");

const router = express.Router();

const pool = require("../config/db");
const adminAuth =
  require("../middleware/adminAuth");

// GET ALL MENU ITEMS

router.get("/", async (req, res) => {

  try {

    const menu = await pool.query(
      "SELECT * FROM menu ORDER BY id DESC"
    );

    res.json(menu.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to fetch menu",
    });

  }

});

// ADD FOOD ITEM

router.post("/", adminAuth,
  async (req, res) => {

  try {

    const {
      name,
      description,
      price,
      category,
      restaurant_name,
      delivery_time,
      rating,
      image,
    } = req.body;

    const newFood = await pool.query(
      `
      INSERT INTO menu
      (
        name,
        description,
        price,
        category,
        restaurant_name,
        delivery_time,
        rating,
        image
      )
      VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *
      `,
      [
        name,
        description,
        price,
        category,
        restaurant_name,
        delivery_time,
        rating,
        image,
      ]
    );

    res.json(newFood.rows[0]);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to add food",
    });

  }

});

// UPDATE FOOD ITEM

router.put("/:id",adminAuth, async (req, res) => {

  try {

    const {
      name,
      description,
      price,
      category,
      restaurant_name,
      delivery_time,
      rating,
      image,
    } = req.body;

    const updatedFood = await pool.query(
      `
      UPDATE menu
      SET
        name = $1,
        description = $2,
        price = $3,
        category = $4,
        restaurant_name = $5,
        delivery_time = $6,
        rating = $7,
        image = $8
      WHERE id = $9
      RETURNING *
      `,
      [
        name,
        description,
        price,
        category,
        restaurant_name,
        delivery_time,
        rating,
        image,
        req.params.id,
      ]
    );

    res.json(updatedFood.rows[0]);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to update food item",
    });

  }

});

// DELETE FOOD ITEM

router.delete("/:id",adminAuth, async (req, res) => {

  try {

    await pool.query(
      "DELETE FROM menu WHERE id = $1",
      [req.params.id]
    );

    res.json({
      message: "Food deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to delete food",
    });

  }

});

module.exports = router;