require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/db');
const authRouter = require('./routes/auth');
const doctorRouter = require('./routes/doctorRoute');
const roomRouter = require('./routes/roomRoute');
const reservationRouter = require('./routes/reservationRoute');


const app = express();
const PORT = process.env.PORT || 5000;
// cors
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/room', roomRouter);
app.use('/api/reservation', reservationRouter);

// Connect to MongoDB
db.connect();

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
