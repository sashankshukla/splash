import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser, FaMoneyBill } from 'react-icons/fa';
import JoinForm from './JoinForm';

const Pool = ({
  poolId,
  title,
  createdBy,
  listingId,
  members,
  totalValue,
  remaining,
  contribution,
}) => {
  const token = useSelector((store) => store.auth.token);
  const [modalVisible, setModalVisible] = useState(false);
  const progress = ((totalValue - remaining) / totalValue) * 100;

  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-xl shadow-md m-4 p-4">
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
      {!members.includes(token.email) && (
        <button
          className="m-1 px-4 py-2 text-white bg-primary-green rounded-lg inline-block"
          onClick={() => setModalVisible(true)}
        >
          <span>Join Pool</span>
        </button>
      )}
      {createdBy === token.email && (
        <button
          className="m-1 px-4 py-2 bg-red-500 text-white rounded-lg inline-block"
          onClick={() => dispatch({ type: 'pools/deletePool', payload: parseInt(poolId) })}
        >
          Delete Pool
        </button>
      )}
      <JoinForm poolId={poolId} modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </div>
  );
};

export default Pool;
