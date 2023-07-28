const express = require('express');
const mongoose = require('mongoose');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();
const PORT = process.env.PORT || 5001;
const bodyParser = require('body-parser');
const connectDB = require('./config/connectDB');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'splash455',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

// Initialize express
const app = express();
connectDB();

const corsOptions = {
  origin: "https://splash-twqs.onrender.com", // frontend URI (ReactJS)
}

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.any());

// Routes
app.use('/users', require('./routes/userRoutes'));
app.use('/listings', require('./routes/listingRoutes'));
app.use('/pools', require('./routes/poolRoutes'));

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
