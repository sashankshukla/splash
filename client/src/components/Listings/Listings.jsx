import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFilteredListings, getListingsData } from '../../features/listings/listingsSlice';

import Listing from './Listing/Listing';
import ListingModal from './Listing/ListingModal';
import ListingForm from './ListingForm';
import Filter from '../Filter/Filter';

import NoResults from '../Accessories/NoResults/NoResults';
import { FaPlusCircle } from 'react-icons/fa';

const Listings = () => {
  const dispatch = useDispatch();

  const token = useSelector((store) => store.auth.token);
  const { listings, listingFilter, isError, isSuccess, isLoading, message } =
    useSelector(getListingsData);

  useEffect(() => {
    return () => {
      dispatch(fetchFilteredListings());
    };
  }, [dispatch, listingFilter]);

  const [selectedListing, setSelectedListing] = useState(null);
  const [formVisible, setFormVisible] = useState(false);

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
      className="flex flex-col justify-center items-center pt-16 mx-4 bg-gray-100"
    >
      <Filter />

      <button
        className="px-4 py-2 mt-8 flex flex-row justify-center align-center text-white font-medium bg-primary-darkgreen rounded-lg transition duration-300 ease-in-out"
        onClick={() => setFormVisible(true)}
      >
        <FaPlusCircle className="mt-1 mr-1" />
        <span>Add New Listing</span>
      </button>
      <ListingForm formVisible={formVisible} setFormVisible={setFormVisible} isEditing={false} />
      <ListingModal selectedListing={selectedListing} setSelectedListing={setSelectedListing} />
      {listings.length === 0 && <NoResults />}
      {listings.length > 0 && (
        <>
          <h1 className="text-2xl mt-8 font-light text-center text-primary-darkgreen">
            Showing {listings.length} results.....
          </h1>

          <div
            id="listings-container"
            className="flex flex-wrap justify-center items-center content-evenly p-2 overflow-hidden"
          >
            {renderedListings}
          </div>
        </>
      )}
    </div>
  );
};
export default Listings;
