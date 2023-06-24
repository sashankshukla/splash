const express = require('express');
const router = express.Router();

// destructured controllers
const {
  addPool,
  deletePool,
  joinPool,
  leavePool,
  getPoolsForListing,
  getTotalPoolEquity,
  getPoolsForUser,
} = require('../controllers/poolController');

// routes
router.post('/', addPool);
router.delete('/:id', deletePool);
router.post('/:id/join', joinPool);
router.post('/:id/leave', leavePool);
router.get('/listing/:listingId', getPoolsForListing);
router.get('/totalEquity/:id', getTotalPoolEquity);
router.get('/user/:userId', getPoolsForUser);
