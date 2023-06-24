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
      listings.filter((listing) => filter.status == 'All' || listing.status == filter.statusVis),
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

  // keywords: [""], //will have any number of strings (for now ui will only allow one)
  // sort: "recent", //this is the default, should make enum later
  // priceRange: [],  //will either be empty (meaning no range), or have two values [lowerfloat, upperfloat]
  // status: "all" //can be one of "all", "open", or "closed"

  // TODO: THIS WOULD BE WHERE LOGIC FOR CLIENT SIDE VERSION OF FILTERS IS?
  const renderedListings = filtered.map(
    (listing, index) =>
      Object.keys(token).length > 0 && (
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
