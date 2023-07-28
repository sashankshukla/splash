import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../../features/auth/authSlice.js';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.jsx';
import { fetchPoolsForUser } from '../../features/pools/poolsSlice.js';
import { getPoolsData } from '../../features/pools/poolsSlice.js';

const ProfileOverview = () => {
  const dispatch = useDispatch();
  const userToken = useSelector((store) => store.auth.token);
  const { pools, isError, isSuccess, isLoading, message } = useSelector(getPoolsData);

  useEffect(() => {
    if (userToken) {
      dispatch(fetchUser());
      dispatch(fetchPoolsForUser());
    }
  }, [dispatch, userToken]);

  const user = useSelector((store) => store.auth.user);
  if (!user) {
    return <LoadingSpinner />;
  }
  function sumOwnership(user) {
    if (!user || !Array.isArray(user.ownerships)) {
      return 0; // Return 0 if user or user.ownership is not defined or not an array
    }

    let totalAmount = 0;

    for (const ownership of user.ownerships) {
      if (ownership.amount && typeof ownership.amount === 'number') {
        totalAmount += ownership.amount;
      }
    }

    return totalAmount;
  }

  let current_hour = new Date().getHours();
  let greeting;
  if (current_hour < 12) {
    greeting = 'Good morning';
  } else if (current_hour < 18) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-white rounded-xl shadow-md overflow-hidden px-12">
      <div className="p-8">
        <div className="text-md font-semibold text-gray-400">
          {greeting}, {user.name}. Your portfolio is worth
        </div>
        <div className="text-5xl font-bold">
          ${user.funds.toLocaleString()}
          <span className="text-2xl text-gray-500">CAD</span>
        </div>
        <hr className="my-4" />
        <div className="uppercase tracking-wide text-sm text-green-800 font-semibold">
          {user.name}
        </div>
        <p className="block mt-1 text-lg leading-tight font-medium text-black">{user.email}</p>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex flex-col justify-start items-start w-full md:w-1/3">
            <p className="mt-2 text-gray-500">
              Member since:{' '}
              {new Date(user.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
              })}{' '}
            </p>
            <p className="mt-2 text-gray-500">Assets Owned: {user.ownerships.length}</p>
            <p className="mt-2 text-gray-500">
              Assets Value: ${sumOwnership(user).toLocaleString()}
            </p>
            <p className="mt-2 text-gray-500">Part of Pools: {pools.length}</p>
          </div>
          <div className="px-4 py-6 mt-8 md:-mt-12 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 w-full md:w-2/3">
            <div className="flex items-center">
              <svg
                aria-hidden="true"
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Info</span>
              <h3 className="text-lg font-medium">Deposit funds to trade on Splash</h3>
            </div>
            <div className="mt-2 mb-4 text-sm">
              Move funds from other bank accounts, including TFSA's, RRSP's, and more. We'll cover
              the transfer fee. Invest in all types of assets either individually or through pools.
            </div>
            <div className="flex">
              <Link to="/payment">
                <button
                  type="button"
                  className="text-white bg-green-800 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center"
                >
                  Add Funds
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
