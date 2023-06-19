import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';

// import {} from '../../features/listings/listingsSlice';

import Listing from '../Listing/Listing';
import ListingModal from '../Listing/ListingModal';
import Filter from '../Filter/Filter';

import './Listings.css';

const Listings = () => {

  const listings = useSelector((state) => state.listings);

  const renderedListings = listings.map((listing, index) => (
    <Listing  key = {index}
              id = {listing.listingId}
              title = {listing.title}
              description = {listing.description}
              price = {listing.price}
              location = {listing.location}
              images = {listing.images}
              seller = {listing.seller}
              status = {listing.status}
              onClick = {null}
    />
            // listingId: "0123456789",
            // title: "",
            // description: "",
            // price: 0,
            // location: "",
            // images: "", //What to do for this?
            // seller: "",
            // status: true
  ));

  return (
    <div
      id="listings-page-container"
      className="flex flex-col justify-center items-center pt-16 mx-4"
    >
      <Filter />

      {/* <ListingModal selectedItem={item} onClose={() => setItem(null)} /> */}

      <div
        id="listings-container"
        className="flex flex-wrap justify-center items-center content-evenly p-2 overflow-hidden"
      >

        {renderedListings}
      </div>
    </div>
  );
};
export default Listings;
