const express = require('express');
const router = express.Router();

// destructured controllers
const {
  addUser,
  getUserAssets,
  addFunds,
  getUser,
  addAccount,
  getAllUser,
  getPendingFunds,
  updateUser,
  updateBank,
  deleteBank
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// routes
router.post('/', addUser);
router.get('/', authMiddleware, getAllUser);
router.get('/admin/funds',authMiddleware, getPendingFunds);
router.get('/assets', authMiddleware, getUserAssets);
router.post('/addFunds', authMiddleware, addFunds);
router.get('/:email', authMiddleware, getUser);
router.post('/addAccount', authMiddleware, addAccount);
router.put('/:email', authMiddleware, updateUser)
router.put('/assets/:bankId', authMiddleware, updateBank);
router.delete('/assets/:bankId', authMiddleware, deleteBank);


module.exports = router;
