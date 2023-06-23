import React from 'react';
import { useDispatch } from 'react-redux';

const ListingModal = ({ selectedItem, onClose, onDel }) => {
  const dispatch = useDispatch();

  if (!selectedItem) return null;

  const { listingId, title, location, description, price, images, seller, status } = selectedItem;

  const renderedImages = images.map((image, img_index) => (
    <img key={img_index} src={image} alt="" className="object-cover w-48 h-48 rounded-md mx-auto" />
  ));

  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50`}
    >
      <div className="relative bg-white rounded-lg shadow w-screen h-auto max-w-md max-h-full overflow-y-auto">
        <div className="p-6 text-center">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            X
          </button>
          {/* TODO: add role indicator for screen readers */}

          {renderedImages}
          {/*
            TODO: format into an image carousel
            See: https://www.material-tailwind.com/docs/react/carousel
          */}

          <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize">{title}</h1>
          <h3 className="mt-4 text-xl font-semibold text-gray-700 capitalize">{location}</h3>

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
            {seller}
          </p>
          <p className="mt-2 text-md text-gray-900">
            <span className="font-bold">Status: </span>
            {status}
          </p>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
            Edit Listing
          </button>
          <button onClick={onDel} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
            Delete Listing
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingModal;
