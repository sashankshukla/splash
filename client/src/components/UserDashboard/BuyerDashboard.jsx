import React from 'react';
import PurchaseCard from './PurchaseCard';

const BuyerDashboard = () => {
  let assets = [
    {
      name: 'Apple Inc.',
      id: 'AAPL',
      purchasePrice: 120.0,
      currentPrice: 130.5,
    },
    {
      name: 'Tesla, Inc.',
      id: 'TSLA',
      purchasePrice: 600.0,
      currentPrice: 550.0,
    },
    {
      name: 'Microsoft Corporation',
      id: 'MSFT',
      purchasePrice: 200.0,
      currentPrice: 205.0,
    },
    {
      name: 'Amazon.com, Inc.',
      id: 'AMZN',
      purchasePrice: 3000.0,
      currentPrice: 1100.0,
    },
    {
      name: 'Alphabet Inc.',
      id: 'GOOGL',
      purchasePrice: 1500.0,
      currentPrice: 1520.0,
    },
  ];

  const OwnedAssets = () => {
    return (
      <div className="md:w-2/3 md:h-auto flex flex-col justify-center items-center md:px-8 pb-8 rounded-lg shadow-lg">
        <h1 className="text-4xl my-6 font-bold text-gray-900">Your Portfolio</h1>
        <div className="flex flex-row justify-between items-center w-full h-12 bg-green-100 rounded-t-lg shadow-lg px-8">
          <div className="flex flex-col justify-center w-2/4 items-start">
            <h1 className="text-sm md:text-md text-gray-600 font-semibold"> Name </h1>
          </div>
          <div className="flex flex-col justify-center w-1/4 items-start">
            <h1 className="text-sm md:text-md text-gray-600 font-bold"> Purchase Price </h1>
          </div>
          <div className="flex flex-col justify-center w-1/4 items-start">
            <h1 className="text-sm sm:text-md text-gray-600 font-bold"> Current Price </h1>
          </div>
        </div>
        {assets.map((asset, idx) => {
          return (
            <PurchaseCard
              key={idx}
              name={asset.name}
              id={asset.id}
              purchasePrice={asset.purchasePrice}
              currentPrice={asset.currentPrice}
            />
          );
        })}
      </div>
    );
  };

  const UserPools = () => {
    return <div className="md:w-1/3 bg-red-200 h-auto md:px-8"></div>;
  };

  return (
    <>
      <div className="h-screen bg-blue-200 w-screen">LMAO</div>
      <div className="flex flex-col md:flex-row">
        <OwnedAssets />
        <UserPools />
      </div>
    </>
  );
};

export default BuyerDashboard;
