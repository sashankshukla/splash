const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5001;
const bodyParser = require('body-parser');
const connectDB = require('./config/connectDB');
const cors = require('cors');

// Initialize express
const app = express();
// connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
