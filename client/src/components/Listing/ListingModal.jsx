import React from 'react';

const ListingModal = ({ selectedItem, onClose }) => {
  if (!selectedItem) return null;

  const { address, price, owner, imageSrc, openPools } = selectedItem;

  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50`}
    >
      <div className="relative bg-white rounded-lg shadow w-screen h-auto max-w-md max-h-full overflow-y-auto">
        <div className="p-6 text-center">
          <img
            className="object-cover w-48 h-48 rounded-md mx-auto"
            src={imageSrc}
            alt="listing"
          ></img>

          <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize">{address}</h1>

          <p className="mt-4 text-md text-justify text-gray-900">
            <span className="font-bold">Description: </span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut gravida tortor. Nunc
            luctus sapien tellus, ut dapibus nisl sagittis vel. Nunc blandit libero non nunc
            imperdiet, eget finibus magna luctus. Quisque luctus ultrices nulla, id imperdiet sapien
            lacinia id. Donec pellentesque in odio a volutpat. Nam ligula ligula, feugiat nec est a,
            interdum tincidunt enim.
          </p>
          <p className="mt-2 text-md text-gray-900">
            <span className="font-bold">Open Pools: </span>
            {openPools}
          </p>
          <p className="mt-2 text-md text-gray-900">
            <span className="font-bold">Price: </span>
            {price}
          </p>
          <p className="mt-2 text-md text-gray-900">
            <span className="font-bold">Owner: </span>
            {owner}
          </p>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingModal;
