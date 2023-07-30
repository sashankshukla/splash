import React, { useState, useEffect } from 'react';
import SellerListings from './SellerListings';
import ApprovalCard from './ApprovalCard';
import { useSelector } from 'react-redux';
import axios from 'axios';

import LoadingSpinner from '../../Accessories/LoadingSpinner/LoadingSpinner';
import NoResults from '../../Accessories/NoResults/NoResults';

const SellerDashboard = () => {
  const auth_token = useSelector((store) => store.auth.auth_token);
  const token = useSelector((store) => store.auth.token);
  const [approvalPools, setApprovalPools] = useState([]);
  const fetchApprovalPools = async () => {
    const response = await axios.get('https://splash-server.onrender.com/pools/completed', {
      headers: {
        Authorization: `${auth_token}`,
      },
    });
    console.log(response.data);
    setApprovalPools(response.data);
  };

  useEffect(() => {
    fetchApprovalPools();
  }, [auth_token]);

  return (
    <div className="h-max pb-48 w-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">Your Listings</h1>
      <SellerListings />
      <h1 className="text-3xl my-6 font-bold">{`Buyers awaiting your approval ${
        token.name.split(' ')[0]
      }...`}</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 mx-12">
        {/* {approvalPools.length === 0 && <LoadingSpinner />} */}
        {approvalPools.length === 0 && <NoResults />}
        {approvalPools.map((pool, index) => (
          <ApprovalCard
            handleAction={fetchApprovalPools}
            key={index}
            poolTitle={pool.name}
            poolId={pool._id}
            listingId={pool.listingId}
            members={pool.users}
          />
        ))}
      </div>
    </div>
  );
};

export default SellerDashboard;
