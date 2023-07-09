import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset, fetchListings, getListingsData } from '../../features/listings/listingsSlice'; //Selector functions

import Listing from '../Listing/Listing';
import ListingModal from '../Listing/ListingModal';
import ListingForm from './ListingForm';
import Filter from '../Filter/Filter';

import './Listings.css';
import { FaPlusCircle } from 'react-icons/fa';

const Listings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const token = useSelector((store) => store.auth.token); //auth_token is what we want for header config
  const { listings, isError, isSuccess, isLoading, message } = useSelector(getListingsData);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(fetchListings());

    return () => {
      dispatch(reset());
    }
  }, [isError, message, dispatch]);

  const [selectedListing, setSelectedListing] = useState(null);
  const [formVisible, setFormVisible] = useState(false);

  //if is loading, return spinner instead of page view?

  const renderedListings = listings.map(
    (listing, index) =>
      Object.keys(token).length > 0 && (
        <Listing
          key={index}
          id={listing.id}
          name={listing.name}
          street={listing.address.street}
          city={listing.address.city}
          country={listing.address.country}
          postalCode={listing.address.postalCode}
          description={listing.description}
          //details?
          price={listing.price}
          images={listing.images}
          status={listing.status}
          createdBy={listing.createdBy}
          onClick={() => setSelectedListing(listing)}
        />
      ),
  );

  return (
    <div
      id="listings-page-container"
      className="flex flex-col justify-center items-center pt-16 mx-4"
    >
      <Filter />

      <button
        className="px-4 py-2 mt-8 flex flex-row justify-center align-center text-white font-medium bg-primary-darkgreen rounded-lg duration-150"
        onClick={() => setFormVisible(true)}
      >
        <FaPlusCircle className="mt-1 mr-1" />
        <span>Add New Listing</span>
      </button>

      <ListingForm formVisible={formVisible} setFormVisible={setFormVisible} />

      <ListingModal
        selectedListing={selectedListing}
        setSelectedListing={setSelectedListing}
      />

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
