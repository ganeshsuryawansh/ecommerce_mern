const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");


// const userSchema = new mongoose.Schema({
//     name: String,
//     email: {
//         type: String,
//         unique: true
//     },
//     pass: String,
//     address: String,
//     phone: String
// });

// const User = mongoose.model('User', userSchema);



// Login endpoint
router.post('/login', async (req, res) => {
    const { email, pass } = req.body;
    try {
        // Check if a user with the provided email exists
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Compare the provided password with the stored password
        if (user.pass === pass) {
            // This is a very basic way to do it. In a real-world scenario, 
            // you'd want to send a JWT (JSON Web Token) or some other form of session token.
            res.json({ message: 'Login successful!' });
        } else {
            res.status(401).json({ message: 'Incorrect password.' });
        }

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;