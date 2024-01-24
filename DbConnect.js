const express = require("express");
const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB Atlas database.");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB Atlas:", error);
    });


const PORT = 5000;
app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);

