const express = require('express');
const router = express.Router();

// destructured controllers
const {
  getListings,
  getListingsForUser,
  addListing,
  updateListing,
  deleteListing,
  sellListing,
} = require('../controllers/listingController');

// routes
router.get('/', getListings);
router.get('/user', getListingsForUser);
router.post('/', addListing);
router.put('/:id', updateListing);
router.delete('/:id', deleteListing);
router.post('/sell/:listingId/:poolId', sellListing);

module.exports = router;
