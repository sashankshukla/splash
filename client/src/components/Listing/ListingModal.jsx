import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  reset,
  getListingData,
  deleteListing,
  updateListing,
} from '../../features/listings/listingsSlice';
import ListingForm from '../Listings/ListingForm';

const ListingModal = ({ selectedListing, setSelectedListing }) => {
  const user = useSelector((store) => store.auth.token);
  const [formVisible, setFormVisible] = useState(false);

  const dispatch = useDispatch();

  if (!selectedListing) return null;

  const { _id, name, address, description, price, images, status, createdBy } = selectedListing;

  const toggleModalVisibility = () => {
    setSelectedListing(null);
  };

  const editSelectedListing = () => {
    setFormVisible(true);
  };

  const deleteSelectedListing = () => {
    //auth check?
    console.log(_id);
    dispatch(deleteListing(_id));
    setSelectedListing(null);
  };

  const renderedImages = images.map((image, img_index) => (
    <img key={img_index} src={image} alt="" className="object-cover w-48 h-48 rounded-md mx-auto" />
  ));

  const renderButtonsCheck =
    user.email == createdBy ? (
      <div id="modal-buttons-container flex flex-row">
        <button
          onClick={editSelectedListing}
          className="mt-4 mr-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Edit Listing
        </button>

        <button
          onClick={deleteSelectedListing}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Delete Listing
        </button>
      </div>
    ) : null;

  return (
    <>
      <ListingForm
        setSelectedListing={setSelectedListing}
        formVisible={selectedListing && formVisible}
        setFormVisible={setFormVisible}
        listingId={_id}
        isEditing={true}
      />
      <div
        id="popup-modal"
        tabIndex="-1"
        className={`fixed inset-0 z-49 flex items-center justify-center bg-gray-900 bg-opacity-50`}
      >
        <div className="relative bg-white rounded-lg shadow w-screen h-auto max-w-md max-h-full overflow-y-auto">
          <div className="p-6 text-center">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={toggleModalVisibility}
            >
              X
            </button>
            {/* TODO: add role indicator for screen readers */}

            {renderedImages}
            {/*
            TODO: format into an image carousel
            See: https://www.material-tailwind.com/docs/react/carousel
          */}

            <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize">{name}</h1>

            <h3 className="mt-4 text-xl font-semibold text-gray-700 capitalize">
              {address.street}, {address.city}
              <br />
              {address.country} {address.postalCode}
            </h3>

            <p className="mt-4 text-md text-justify text-gray-900">
              <span className="font-bold">Description: </span>
              {description}
            </p>

            <p className="mt-2 text-md text-gray-900">
              <span className="font-bold">Open Pools: </span>
              TODO
            </p>

            <p className="mt-2 text-md text-gray-900">
              <span className="font-bold">Price: </span>
              {price}
            </p>

            <p className="mt-2 text-md text-gray-900">
              <span className="font-bold">Seller: </span>
              {createdBy}
            </p>

            <p className="mt-2 text-md text-gray-900">
              <span className="font-bold">Status: </span>
              {status}
            </p>

            {renderButtonsCheck}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingModal;
