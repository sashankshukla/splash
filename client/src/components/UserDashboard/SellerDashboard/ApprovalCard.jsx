import React from 'react';
import { FaUser } from 'react-icons/fa';

const ApprovalCard = ({ poolTitle, poolId, listingId }) => {
  return (
    <div className="flex flex-col items-center mx-4 shadow-lg rounded-lg bg-white">
      <div className="w-full bg-green-50 rounded-t-lg text-center p-2">
        <h2 className="text-3xl font-bold text-green-800">{poolTitle}</h2>
      </div>
      <div className="flex flex-col space-y-2 mt-4 w-full text-center px-4">
        <h2 className="text-gray-600 text-lg font-semibold">
          Pool ID: <span className="text-gray-400 text-md font-normal">{poolId}</span>
        </h2>
        <h2 className="text-gray-600 text-lg font-semibold">
          Listing ID: <span className="text-gray-400 text-md font-normal">{listingId}</span>
        </h2>
        <h2 className="text-gray-600 text-lg font-semibold">
          <FaUser /> View Members
        </h2>
      </div>
      <div className="flex flex-row justify-center w-full space-x-4 mt-4 px-4 pb-4">
        <button className="w-full mx-2 px-4 py-2 text-red-600 hover:bg-gray-100 border-2 border-red-600 rounded-lg">
          Deny
        </button>
        <button className="w-full mx-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
          Approve
        </button>
      </div>
    </div>
  );
};

export default ApprovalCard;
