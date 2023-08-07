const express = require('express');
const router = express.Router();

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
  deleteBank,
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', addUser);
router.get('/admin', authMiddleware, getAllUser);
router.get('/admin/funds', authMiddleware, getPendingFunds);
router.get('/', authMiddleware, getUser);
router.get('/assets', authMiddleware, getUserAssets);
router.post('/', addUser);
router.post('/addFunds', authMiddleware, addFunds);
router.post('/addAccount', authMiddleware, addAccount);
router.put('/:email', authMiddleware, updateUser);
router.put('/assets/:bankId', authMiddleware, updateBank);
router.delete('/assets/:bankId', authMiddleware, deleteBank);

module.exports = router;
