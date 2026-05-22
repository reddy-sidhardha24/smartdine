const express = require("express");

const router = express.Router();

const pool = require("../config/db");


// GET ALL REVIEWS

router.get("/", async (req, res) => {

  try {

    const reviews = await pool.query(
      `
      SELECT *
      FROM reviews
      ORDER BY created_at DESC
      `
    );

    res.json(reviews.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to fetch reviews",
    });

  }

});


// ADD REVIEW

router.post("/", async (req, res) => {

  try {

    const {
      food_name,
      customer_name,
      rating,
      comment,
    } = req.body;

    const newReview = await pool.query(
      `
      INSERT INTO reviews
      (food_name, customer_name, rating, comment)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [
        food_name,
        customer_name,
        rating,
        comment,
      ]
    );

    res.json(newReview.rows[0]);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to add review",
    });

  }

});


// DELETE REVIEW

router.delete("/:id", async (req, res) => {

  try {

    const { id } = req.params;

    await pool.query(
      `
      DELETE FROM reviews
      WHERE id = $1
      `,
      [id]
    );

    res.json({
      message: "Review deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to delete review",
    });

  }

});


module.exports = router;