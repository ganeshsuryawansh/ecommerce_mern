const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");


const CartSchema = new mongoose.Schema({
    _pid: String,
    email: String,
    token: {
        type: String,
        unique: true
    },
});

const Cart = mongoose.model('Cart', CartSchema);

//Recive and store Cart information
router.post('/Send-Cart', async (req, res) => {
    const data = req.body;
    console.log(data);

    // Create a new Cart instance with the received data
    const cart = new Cart({
        _pid: data._pid,
        email: data.email,
        token: data._pid + "_" + data.email
    });

    try {
        await cart.save();
        res.json({ message: 'Data received and stored in Cart!' });
    } catch (error) {
        if (error.code === 11000) { // this error code stands for duplicate key error in MongoDB
            return res.status(400).json({ message: 'Duplicate token. This product is already in the cart.' });
        }
        console.error("Error saving to database:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

});


module.exports = router;