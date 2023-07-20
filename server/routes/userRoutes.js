const express = require('express');
const router = express.Router();

// destructured controllers
const {
  addUser,
  getUserAssets,
  addFunds,
  getUser,
  addAccount,
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// routes
router.post('/', addUser);
router.get('/assets', authMiddleware, getUserAssets);
router.post('/addFunds', authMiddleware, addFunds);
router.get('/:email', authMiddleware, getUser);
router.post('/addAccount', authMiddleware, addAccount);

module.exports = router;
