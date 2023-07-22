const express = require('express');
const router = express.Router();

// destructured controllers
const {
  addUser,
  getUserAssets,
  addFunds,
  getUser,
  addAccount,
  getUserAssetPerformance,
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// routes
router.get('/assets', authMiddleware, getUserAssets);
router.get('/assetPerformance', authMiddleware, getUserAssetPerformance);
router.get('/:email', authMiddleware, getUser);
router.post('/', addUser);
router.post('/addFunds', authMiddleware, addFunds);
router.post('/addAccount', authMiddleware, addAccount);

module.exports = router;
