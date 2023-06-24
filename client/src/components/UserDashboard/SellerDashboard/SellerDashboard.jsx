import React from 'react';
import SellerListings from './SellerListings';
import ApprovalCard from './ApprovalCard';
import { useSelector } from 'react-redux';

const SellerDashboard = () => {
  const approvalData = [
    {
      poolTitle: 'American Eagles',
      poolId: 'ae34ljfff9abb',
      listingId: 'L8666AE34',
    },
    {
      poolTitle: 'Blue Dolphins',
      poolId: 'bd78gjklm12cde',
      listingId: 'L5542BD78',
    },
    {
      poolTitle: 'Golden Tigers',
      poolId: 'gt90mnop34efg',
      listingId: 'L2290GT90',
    },
    {
      poolTitle: 'Silver Lions',
      poolId: 'sl56qrst78hij',
      listingId: 'L7832SL56',
    },
  ];

  const token = useSelector((store) => store.auth.token);

  return (
    <div className="h-screen mt-48 pb-48 w-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">Your Listings</h1>
      <SellerListings />
      <h1 className="text-3xl my-6 font-bold">{`Buyers awaiting your approval ${
        token.name.split(' ')[0]
      }...`}</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {approvalData.map((data, index) => (
          <ApprovalCard
            key={index}
            poolTitle={data.poolTitle}
            poolId={data.poolId}
            listingId={data.listingId}
          />
        ))}
      </div>
    </div>
  );
};

export default SellerDashboard;
