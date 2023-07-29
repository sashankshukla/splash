const express = require('express');
const router = express.Router();

// destructured controllers
const {
  denyFunds, approvedFunds
} = require('../controllers/emailController');
const authMiddleware = require('../middleware/authMiddleware');

// routes
router.post('/approvedFunds', approvedFunds);
router.post('/denyFunds', denyFunds);


module.exports = router;
