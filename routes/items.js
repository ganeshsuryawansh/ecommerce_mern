const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
// const Item = require('../models/Item');


const ItemSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  brand: String,
  category: String,
  thumbnail: String,
  images: [String],
});

const Item = mongoose.model("Item", ItemSchema);

router.get('/', async (req, res) => {
  try {
    const items = await Item.find({});
    res.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ errorMessage: error.message });
  }
});

module.exports = router;
