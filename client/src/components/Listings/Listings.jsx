import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPlusCircle } from 'react-icons/fa';
import ListingForm from './ListingForm';

// import {} from '../../features/listings/listingsSlice';

import Listing from '../Listing/Listing';
import ListingModal from '../Listing/ListingModal';
import Filter from '../Filter/Filter';

import './Listings.css';

const Listings = () => {
  const [item, setItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const listings = useSelector((state) => state.listings);
  const dispatch = useDispatch();
  // const filters = useSelector((state) => state.filters);

  // TODO: THIS WOULD BE WHERE LOGIC FOR CLIENT SIDE VERSION OF FILTERS IS
  const renderedListings = listings.map((listing, index) => (
    <Listing
      key={index} //TEMPORARY
      id={listing.listingId} //str
      title={listing.title} //str
      location={listing.location} //str
      description={listing.description} //str
      price={listing.price} //float
      images={listing.images} //[urlstr] (array of strings representing urls)
      seller={listing.seller} //str
      status={listing.status} //bool
      onClick={() => setItem(listing)}
    />
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
      <ListingModal
        selectedItem={item}
        onClose={() => setItem(null)}
        onDel={() => {
          dispatch({ type: 'listings/deleteListing', payload: parseInt(item.listingId) });
          setItem(null);
        }}
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
