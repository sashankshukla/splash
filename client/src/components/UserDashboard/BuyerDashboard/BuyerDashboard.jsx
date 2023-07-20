import React, { useEffect } from 'react';
import PurchaseCard from './PurchaseCard';
import Pool from '../../Pool/Pool';
import StockChart from './StockChart.webp';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPoolsForUser } from '../../../features/pools/poolsSlice';

const BuyerDashboard = () => {
  const user = useSelector((store) => store.auth.user);
  const pools = useSelector((state) => state.pools);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchPoolsForUser());
    }
  }, [dispatch, token]);

  if (!user) {
    // Render loading state or return null if you prefer
    return <p>Loading...</p>;
  }

  console.log('user assets');
  console.log(user.ownerships);

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
        {user.ownerships.map((asset, idx) => {
          return (
            <PurchaseCard
              key={idx}
              name={asset.name}
              id={asset.listingId}
              purchasePrice={asset.purchasePrice}
              equity={asset.amount}
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
              poolId={pool.id}
              title={pool.name}
              createdBy={pool.createdBy}
              listingId={pool.listingId}
              members={pool.users}
              totalValue={pool.totalValue}
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
