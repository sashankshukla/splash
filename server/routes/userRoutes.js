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
router.get('/', authMiddleware, getUser);
router.get('/assets', authMiddleware, getUserAssets);
router.post('/', addUser);
router.post('/addFunds', authMiddleware, addFunds);
router.post('/addAccount', authMiddleware, addAccount);

module.exports = router;
