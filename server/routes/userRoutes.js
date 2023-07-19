const express = require('express');
const router = express.Router();

// destructured controllers
const { addUser, getUserAssets, addFunds , getUser, increaseUserFunds} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// routes
router.post('/', addUser);
router.get('/assets', authMiddleware, getUserAssets);
router.post('/addFunds', authMiddleware, addFunds);
router.get('/:email',authMiddleware, getUser);


module.exports = router;
