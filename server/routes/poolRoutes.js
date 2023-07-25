const express = require('express');
const router = express.Router();

// destructured controllers
const {
  getPools,
  addPool,
  deletePool,
  joinPool,
  editPool,
  leavePool,
  getPoolsForListing,
  getTotalPoolEquity,
  getPoolsForUser,
  getPoolsCreatedByUser,
  getPoolsCompletedForUser,
  getPrivatePool,
} = require('../controllers/poolController');

const authMiddleware = require('../middleware/authMiddleware');

// routes
router.post('/', authMiddleware, addPool);
router.delete('/:id', authMiddleware, deletePool);
router.post('/:id/join', authMiddleware, joinPool);
router.post('/:id/edit', authMiddleware, editPool);
router.post('/:id/leave', authMiddleware, leavePool);
router.get('/', getPools);
router.get('/completed', authMiddleware, getPoolsCompletedForUser);
router.get('/listing/:listingId', getPoolsForListing);
router.get('/totalEquity/:id', getTotalPoolEquity);
router.get('/user/joined/', authMiddleware, getPoolsForUser);
router.get('/user/created/', authMiddleware, getPoolsCreatedByUser);
router.get('/private/:id', authMiddleware, getPrivatePool);

module.exports = router;
