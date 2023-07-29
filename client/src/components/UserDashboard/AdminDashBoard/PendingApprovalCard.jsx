import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsHourglass } from 'react-icons/bs';
import { FaPiggyBank } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import { updateBank } from '../../../features/auth/authSlice';
import axios from 'axios';




const PendingApprovalCard = (account) => {
  const auth_token = useSelector((store) => store.auth.auth_token);
  const token = useSelector((store) => store.auth.token);
  const dispatch = useDispatch();

    const formatDate = (mongoDateString) => {
        const dateObject = new Date(mongoDateString);
        const formattedDate = dateObject.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        return formattedDate;
      };

  const sendApprovalEmail = async (body) => {
    const response = await axios.post('https://splash-server.onrender.com/email/approvedFunds', body ,{
      headers: {
        Authorization: `${auth_token}`,
      },
    });
    return response;
  };

  const sendDenyEmail = async (body) => {
    const response = await axios.post('https://splash-server.onrender.com/email/denyFunds', body ,{
      headers: {
        Authorization: `${auth_token}`,
      },
    });
    return response;
  };
  return (
    <div className="bg-white rounded-xl shadow-md m-4 p-4">
      <div className="text-green-900 font-bold text-xl mb-2">{account.accountName}</div>
      <div className="text-gray-700 text-base">
        <div className="flex flex-row justify-start items-center">
          <FiMail /> {account.userEmail}
        </div>
        <div className="flex flex-row justify-start items-center">
          <AiOutlineFieldNumber /> {account.accountNumber}
        </div>
        <div className="flex flex-row justify-start items-center">
          <FaPiggyBank /> {account.bankName}
        </div>
        <div className="flex flex-row justify-start items-center">
          <BsHourglass /> {formatDate(account.createdAt)}
        </div>
      </div>
        <button
          className="m-1 px-4 py-2 text-white bg-primary-green rounded-lg inline-block"
          onClick={() => {
            sendApprovalEmail(account);
            dispatch(updateBank({ account: account, status: true }));}}
          >
          <span>Approve</span>
        </button>
        <button
          className="m-1 px-4 py-2 bg-red-500 text-white rounded-lg inline-block"
          onClick={() => {
            sendDenyEmail(account);
            dispatch(updateBank({ account: account, status: false }));}}
        >
          Deny
        </button>
    </div>
  );
};

export default PendingApprovalCard;
