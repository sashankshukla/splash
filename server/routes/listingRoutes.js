const express = require('express');
const router = express.Router();

// destructured controllers
const {
  getListings,
  getFilteredListings,
  getListingsForUser,
  addListing,
  updateListing,
  deleteListing,
  sellListing,
} = require('../controllers/listingController');

const authMiddleware = require('../middleware/authMiddleware');

// routes
router.get('/', getListings);
router.get('/filterBy/:query?', getFilteredListings);
router.get('/user', authMiddleware, getListingsForUser);
router.post('/', authMiddleware, addListing);
router.put('/:id', authMiddleware, updateListing);
router.delete('/:id', authMiddleware, deleteListing);
router.post('/sell/:listingId/:poolId', authMiddleware, sellListing);
module.exports = router;
