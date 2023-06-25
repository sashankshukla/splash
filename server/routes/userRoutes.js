const express = require('express');
const router = express.Router();

// destructured controllers
const { addUser, getUserAssets, addFunds } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// routes
router.post('/', addUser);
router.get('/assets', getUserAssets);
router.post('/addFunds', authMiddleware, addFunds);

module.exports = router;
