import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllUsers, fetchPendingFunds } from '../../../features/auth/authSlice';
import AdminUserCard from './AdminUserCard';
import PendingApprovalCard from './PendingApprovalCard';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

const AdminDashBoard = () => {
  const user = useSelector((store) => store.auth.user);
  const userList = useSelector((store) => store.auth.allUser);
  const token = useSelector((state) => state.auth.token);
  const pendingFunds = useSelector((store) => store.auth.pendingFunds);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      console.log('attempting to fetch all users');
      dispatch(fetchAllUsers());
      dispatch(fetchPendingFunds());
    }
  }, [dispatch, token]);

  if (!user) {
    // Render loading state or return null if you prefer
    return <LoadingSpinner />;
  }

  if (userList.length === 0) {
    // Render loading state or return null if you prefer
    return <LoadingSpinner />;
  }

  console.log('Admin Component');
  console.log(userList);

  const UserArrayForSort = [...userList];
  const FundsForSort = [...pendingFunds];

  const sortedUserList = UserArrayForSort.sort((a, b) => {
    // Sort by active status (true first, then false)
    if (a.active === b.active) {
      // If active status is the same, sort alphabetically by name
      return a.name.localeCompare(b.name);
    }
    // Sort active users (true) first, then inactive users (false)
    return a.active ? -1 : 1;
  });

  const sortedFunds = FundsForSort.sort((a, b) => {
    const createdAtA = new Date(a.createdAt);
    const createdAtB = new Date(b.createdAt);
    return createdAtA - createdAtB;
  });

  const UserList = () => {
    return (
      <div className="md:w-2/3 md:h-auto flex flex-col items-start overflow-auto md:px-8 pb-8 rounded-lg shadow-lg">
        <h1 className="text-4xl my-6 font-bold text-gray-900">User List</h1>
        <div className="flex flex-row justify-between items-center w-full h-12 bg-green-100 rounded-t-lg shadow-lg px-8">
          <div className="flex flex-col justify-center w-2/5 items-start">
            <h1 className="text-sm md:text-md text-gray-600 font-semibold"> User </h1>
          </div>
          <div className="flex flex-col justify-center w-1/5 items-start">
            <h1 className="text-sm md:text-md text-gray-600 font-bold"> Join Date </h1>
          </div>
          <div className="flex flex-col justify-center w-1/5 items-start">
            <h1 className="text-sm md:text-md text-gray-600 font-bold"> Last Activity </h1>
          </div>
          <div className="flex flex-col justify-center w-1/5 items-start">
            <h1 className="text-sm sm:text-md text-gray-600 font-bold"> Actions </h1>
          </div>
        </div>
        {sortedUserList.map((user) => {
          return <AdminUserCard {...user} />;
        })}
      </div>
    );
  };

  const PendingFunds = () => {
    return (
      <div className="md:w-1/3 flex flex-col items-start md:h-auto pt-24 md:pt-0 md:px-8">
        <h1 className="text-4xl font-bold text-gray-900">Pending Approval</h1>
        {sortedFunds.map((account) => {
          return <PendingApprovalCard {...account} />;
        })}
      </div>
    );
  };

  return (
    <>
      <div className="h-1/5 w-screen flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-900">Admin Controls</h1>
        {/* <img src={StockChart} alt="Stock Chart" className="h-2/3 w-3/4 object-cover rounded-lg" /> */}
      </div>
      <div className="flex flex-col md:flex-row">
        <UserList />
        <PendingFunds />
      </div>
    </>
  );
};

export default AdminDashBoard;
