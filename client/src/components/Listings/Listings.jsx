import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { FaPlusCircle } from 'react-icons/fa';
import ListingForm from './ListingForm';

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
      <button
        className="px-4 py-2 mt-8 flex flex-row justify-center align-center text-white font-medium bg-primary-darkgreen rounded-lg duration-150"
        onClick={() => setModalVisible(true)}
      >
        <FaPlusCircle className="mt-1 mr-1" />
        <span>Add New Listing</span>
      </button>
      <ListingForm modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <ListingModal selectedItem={item} onClose={() => setItem(null)} />
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
