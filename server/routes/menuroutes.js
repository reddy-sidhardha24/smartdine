const express = require("express");

const router = express.Router();

const pool = require("../config/db");


// GET MENU
router.get("/", async (req, res) => {
  try {

    const menuItems = await pool.query(
      "SELECT * FROM menu ORDER BY id ASC"
    );

    res.status(200).json(menuItems.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });

  }
});


// ADD MENU ITEM
router.post("/", async (req, res) => {
  try {

    const {
      name,
      description,
      price,
      image,
      category,
    } = req.body;

    const newItem = await pool.query(
      `
      INSERT INTO menu
      (name, description, price, image, category)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [name, description, price, image, category]
    );

    res.status(201).json({
      message: "Menu item added",
      item: newItem.rows[0],
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });

  }
});


// DELETE MENU ITEM
router.delete("/:id", async (req, res) => {
  try {

    const { id } = req.params;

    await pool.query(
      "DELETE FROM menu WHERE id = $1",
      [id]
    );

    res.status(200).json({
      message: "Menu item deleted",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });

  }
});

module.exports = router;