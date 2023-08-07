const express = require('express');
const router = express.Router();

const { denyFunds, approvedFunds } = require('../controllers/emailController');

router.post('/approvedFunds', approvedFunds);
router.post('/denyFunds', denyFunds);

module.exports = router;
