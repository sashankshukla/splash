import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';
import ListingForm from './ListingForm';
import Listing from '../Listing/Listing';
import ListingModal from '../Listing/ListingModal';
import Filter from '../Filter/Filter';

import './Listings.css';

const Listings = () => {
  const navigate = useNavigate();
  const token = useSelector((store) => store.auth.token);

  useEffect(() => {
    if (Object.keys(token).length === 0) {
      navigate('/');
    }
  }, [token, navigate]);

  const listings = useSelector((state) => state.listings);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const [item, setItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filtered, setFiltered] = useState(listings);

  //update local state version of listings to match filter preferences on any change to filters
  useEffect(() => {
    //filter by status (All, Available, or Sold)
    setFiltered(
      listings.filter((listing) => filter.status === 'All' || listing.status === filter.statusVis),
    );

    //filter by price range (lowerfloat, upperfloat)
    setFiltered(
      listings.filter((listing) =>
        filter.priceRange.length > 0
          ? filter.priceRange[0] <= listing.price <= filter.priceRange[1]
          : listing,
      ),
    );

    setFiltered(listings.filter((listing) => listing.title.includes(filter.keywords)));

    //sort remaining posts
  }, [filter, listings]);

  const renderedListings = filtered.map(
    (listing, index) =>
      Object.keys(token).length > 0 && (
        <Listing
          key={index}
          id={listing.listingId}
          title={listing.title}
          location={listing.location}
          description={listing.description}
          price={listing.price}
          images={listing.images}
          seller={listing.seller}
          status={listing.status}
          onClick={() => setItem(listing)}
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
        <div
          id="listings-container"
          className="flex flex-wrap justify-center items-center content-evenly p-2 overflow-hidden"
        >
          {renderedListings}
        </div>
      </div>
    </div>
  );
};
export default Listings;
