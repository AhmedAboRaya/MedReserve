require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes


// Connect to MongoDB
db.connect();

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
