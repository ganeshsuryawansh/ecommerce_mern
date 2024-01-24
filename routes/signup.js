const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    pass: String,
    address: String,
    phone: String
});

const User = mongoose.model('User', userSchema);

//Recive and store user information - Signup
router.post('/send-data', async (req, res) => {
    const data = req.body;
    console.log(data);

    // Create a new user instance with the received data
    const user = new User({
        name: data.name,
        email: data.email,
        pass: data.pass,
        address: data.address,
        phone: data.phone
    });
    try {
        // Save the user instance to the database
        await user.save();
        res.json({ message: 'Data received and stored!' });
    } catch (error) {
        console.error("Error saving to database:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;