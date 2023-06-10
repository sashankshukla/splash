import React from 'react';
import PurchaseCard from './PurchaseCard';
import Pool from './Pool';
import StockChart from './StockChart.webp';

const BuyerDashboard = () => {
  let assets = [
    {
      name: 'Apple Inc.',
      id: 'AAPL',
      equity: 10.0,
      purchasePrice: 120.0,
      currentPrice: 130.5,
    },
    {
      name: 'Tesla, Inc.',
      id: 'TSLA',
      equity: 43.86,
      purchasePrice: 600.0,
      currentPrice: 550.0,
    },
    {
      name: 'Microsoft Corporation',
      id: 'MSFT',
      equity: 9.11,
      purchasePrice: 200.0,
      currentPrice: 205.0,
    },
    {
      name: 'Amazon.com, Inc.',
      id: 'AMZN',
      equity: 100.0,
      purchasePrice: 3000.0,
      currentPrice: 1100.0,
    },
    {
      name: 'Alphabet Inc.',
      id: 'GOOGL',
      equity: 12.75,
      purchasePrice: 1500.0,
      currentPrice: 1520.0,
    },
  ];

  const pools = [
    {
      title: 'Tech Stocks Pool',
      id: 'TSK389',
      members: 18,
      totalValue: 12150.37,
      remaining: 2573.52,
      contribution: 312.14,
    },
    {
      title: 'Green Energy Bonds',
      id: 'GEB412',
      members: 24,
      totalValue: 9000.0,
      remaining: 3245.27,
      contribution: 816.23,
    },
    {
      title: 'Real Estate Investment Pool',
      id: 'REI723',
      members: 10,
      totalValue: 45000.45,
      remaining: 15000.0,
      contribution: 2300.14,
    },
    {
      title: 'Crypto Assets Pool',
      id: 'CAP217',
      members: 50,
      totalValue: 25000.77,
      remaining: 8756.12,
      contribution: 450.21,
    },
  ];

  const OwnedAssets = () => {
    return (
      <div className="md:w-2/3 md:h-auto flex flex-col items-start overflow-auto md:px-8 pb-8 rounded-lg shadow-lg">
        <h1 className="text-4xl my-6 font-bold text-gray-900">Your Portfolio</h1>
        <div className="flex flex-row justify-between items-center w-full h-12 bg-green-100 rounded-t-lg shadow-lg px-8">
          <div className="flex flex-col justify-center w-2/5 items-start">
            <h1 className="text-sm md:text-md text-gray-600 font-semibold"> Name </h1>
          </div>
          <div className="flex flex-col justify-center w-1/5 items-start">
            <h1 className="text-sm md:text-md text-gray-600 font-bold"> Purchase Price </h1>
          </div>
          <div className="flex flex-col justify-center w-1/5 items-start">
            <h1 className="text-sm md:text-md text-gray-600 font-bold"> Equity </h1>
          </div>
          <div className="flex flex-col justify-center w-1/5 items-start">
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
              equity={asset.equity}
              currentPrice={asset.currentPrice}
            />
          );
        })}
      </div>
    );
  };

  const UserPools = () => {
    return (
      <div className="md:w-1/3 flex flex-col items-start md:h-auto pt-24 md:pt-0 md:px-8">
        <h1 className="text-4xl font-bold text-gray-900">Joined Pools</h1>
        {pools.map((pool, idx) => {
          return (
            <Pool
              key={idx}
              title={pool.title}
              id={pool.id}
              members={pool.members}
              totalValue={pool.totalValue}
              remaining={pool.remaining}
              contribution={pool.contribution}
            />
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-gray-900">Performance</h1>
        <img src={StockChart} alt="Stock Chart" className="h-2/3 w-3/4 object-cover rounded-lg" />
      </div>
      <div className="flex flex-col md:flex-row">
        <OwnedAssets />
        <UserPools />
      </div>
    </>
  );
};

export default BuyerDashboard;
