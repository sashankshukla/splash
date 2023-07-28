import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser, FaMoneyBill } from 'react-icons/fa';
import JoinForm from './JoinForm';
import { deletePool } from '../../features/pools/poolsSlice';

const Pool = ({
  poolId,
  title,
  createdBy,
  listingId,
  members,
  totalValue,
  remaining,
  listing,
  onClick,
}) => {
  const token = useSelector((store) => store.auth.token);
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const memberFound = members.find((member) => member.email === token.email);
  const memberContribution = memberFound ? memberFound.equity : 0;

  const progress = (1 - remaining / totalValue) * 100;

  return (
    <div id={poolId} className="bg-white rounded-xl shadow-md m-4 p-4">
      <div className="text-green-900 font-bold text-xl mb-2">{title}</div>
      <div className="text-gray-700 text-base">
        <p>Listing ID: {listingId}</p>
        <div className="flex flex-row justify-start items-center">
          <FaUser /> {members.length}
        </div>
        <div className="flex flex-row justify-start items-center">
          <FaMoneyBill /> ${totalValue}
        </div>
        <p>Remaining: ${remaining}</p>
        <p>Your Contribution/Equity: ${memberContribution}</p>
      </div>
      <div className="relative pt-1">
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-300">
          <div
            style={{ width: `${progress}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
          ></div>
        </div>
      </div>
      <button
        className="m-1 px-4 py-2 text-white bg-primary-green rounded-lg inline-block"
        onClick={() => {
          console.log('Click');
          console.log(listing);
          onClick(listing);
        }}
      >
        <span>View</span>
      </button>
      {!memberFound && (
        <button
          className="m-1 px-4 py-2 text-white bg-primary-green rounded-lg inline-block"
          onClick={() => setModalVisible(true)}
        >
          <span>Join Pool</span>
        </button>
      )}
      {memberFound && (
        <button
          className="m-1 px-4 py-2 text-gray-900 bg-yellow-400 rounded-lg inline-block"
          onClick={() => setModalVisible(true)}
        >
          <span>Modify Contribution</span>
        </button>
      )}
      {createdBy === token.email && (
        <button
          className="m-1 px-4 py-2 bg-red-500 text-white rounded-lg inline-block"
          onClick={() => dispatch(deletePool(poolId))}
        >
          Delete Pool
        </button>
      )}
      <JoinForm
        poolId={poolId}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        modify={memberFound}
        currentContribution={memberContribution}
      />
    </div>
  );
};

export default Pool;
