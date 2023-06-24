const express = require('express');
const router = express.Router();

// destructured controllers
const { addUser, getUserAssets, addFunds } = require('../controllers/userController');

// routes
router.post('/', addUser);
router.get('/assets', getUserAssets);
router.post('/addFunds', addFunds);

module.exports = router;
