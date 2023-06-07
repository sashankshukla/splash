import React from 'react';
import { FaUser, FaMoneyBill } from 'react-icons/fa';

const Pool = ({ title, id, members, totalValue, remaining, contribution }) => {
  const progress = ((totalValue - remaining) / totalValue) * 100;

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden m-4 p-4">
      <div className="text-green-900 font-bold text-xl mb-2">{title}</div>
      <div className="text-gray-700 text-base">
        <p>Listing ID: {id}</p>
        <div className="flex flex-row justify-start items-center">
          <FaUser /> {members}
        </div>
        <div className="flex flex-row justify-start items-center">
          <FaMoneyBill /> ${totalValue}
        </div>
        <p>Remaining: ${remaining}</p>
        <p>Your Contribution/Equity: ${contribution}</p>
      </div>
      <div className="relative pt-1">
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-300">
          <div
            style={{ width: `${progress}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Pool;
