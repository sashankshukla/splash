const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT || 5001;
const bodyParser = require('body-parser');
const connectDB = require('./config/connectDB');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorHandler');

// Initialize express
const app = express();
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler);

// Routes
app.use('/users', require('./routes/userRoutes'));
app.use('/listings', require('./routes/listingRoutes'));
app.use('/pools', require('./routes/poolRoutes'));

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
