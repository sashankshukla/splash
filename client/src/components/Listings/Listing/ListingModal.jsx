import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteListing } from '../../../features/listings/listingsSlice';
import ListingForm from '../ListingForm';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import PoolForm from '../../Pools/PoolForm';
import CopyToClipboard from '../../Accessories/CopyToClipboard/CopyToClipboard';
const ListingModal = ({ selectedListing, setSelectedListing }) => {
  const user = useSelector((store) => store.auth.token);
  const [formVisible, setFormVisible] = useState(false);
  const [poolFormVisible, setPoolFormVisible] = useState(false);

  const dispatch = useDispatch();

  if (!selectedListing) return null;

  const {
    _id,
    name,
    address,
    description,
    price,
    images,
    status,
    createdBy,
    investmentType,
    details,
  } = selectedListing;

  const toggleModalVisibility = () => {
    setSelectedListing(null);
  };

  const editSelectedListing = () => {
    setFormVisible(true);
  };

  const deleteSelectedListing = () => {
    dispatch(deleteListing(_id));
    setSelectedListing(null);
  };

  const ImageCarousel = ({ images }) => {
    return (
      <AliceCarousel
        items={images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${index + 1}`}
            className="h-full w-full object-cover rounded-md"
          />
        ))}
        disableButtonsControls
        autoPlayInterval={3000}
        animationDuration={1000}
        infinite
        autoPlay
      />
    );
  };

  const renderButtonsCheck =
    user.email === createdBy ? (
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

  const renderedDetails = details.map((detail, index) => (
    <p key={index} className="mt-2 text-md text-gray-900">
      <span className="font-bold">{detail.name}: </span>
      {detail.value}
    </p>
  ));

  return (
    <>
      <ListingForm
        setSelectedListing={setSelectedListing}
        formVisible={selectedListing && formVisible}
        setFormVisible={setFormVisible}
        listingId={_id}
        isEditing={true}
      />
      <PoolForm
        modalVisible={poolFormVisible}
        setModalVisible={setPoolFormVisible}
        listingId={_id}
      />
      <div
        id="popup-modal"
        tabIndex="-1"
        className={`pt-24 fixed inset-0 z-49 flex items-center justify-center bg-gray-900 bg-opacity-50`}
        onClick={toggleModalVisibility}
      >
        <div
          className="relative bg-white rounded-lg shadow w-screen h-auto max-w-md max-h-full overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 text-center">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={toggleModalVisibility}
            >
              X
            </button>
            <ImageCarousel images={images}></ImageCarousel>
            <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize">{name}</h1>
            <h1 className="mt-4 flex flex-row justify-center text-md font-light text-gray-500">
              id : {_id} <CopyToClipboard value={_id} />
            </h1>
            <h3 className="mt-4 text-xl font-semibold text-gray-700 capitalize">
              {address.street}, {address.city}
              <br />
              {address.country} {address.postalCode}
            </h3>
            <p className="mt-4 text-md text-gray-900">
              <span className="font-bold">Description: </span>
              {description}
            </p>
            <p className="mt-2 text-md text-gray-900">
              <span className="font-bold">Investment Type: </span>
              {investmentType}
            </p>
            <p className="mt-2 text-md text-gray-900">
              <span className="font-bold">Price: </span>
              {price}
            </p>
            <p className="mt-2 text-md text-gray-900">
              <span className="font-bold">Seller: </span>
              {createdBy}
            </p>
            <p className="mt-2 text-md font-bold text-gray-900">Additional Details</p>
            {renderedDetails}
            <p className="mt-2 text-md text-gray-900">
              <span className="font-bold">Status: </span>
              {status}
            </p>
            {renderButtonsCheck}

            {user.email !== createdBy && (
              <button
                onClick={() => setPoolFormVisible(true)}
                className="mt-4 px-4 py-2 bg-green-700 text-white rounded-lg"
              >
                Start New Pool
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingModal;
