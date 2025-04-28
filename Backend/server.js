const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const movieRoutes = require('./routes/movieRoutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/movies', movieRoutes);


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(5000, () => console.log('Server running on http://localhost:5000'));
    })
    .catch(err => console.error('MongoDB connection error:', err));
