import React from 'react';

const AdminUserCard = (user) => {
  const formatDate = (mongoDateString) => {
    const dateObject = new Date(mongoDateString);
    const formattedDate = dateObject.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return formattedDate;
  };

  return (
    <div className="flex flex-row justify-between items-center w-full h-24 bg-white border-b-2 border-dashed border-gray-200 hover:bg-gray-200 px-8">
      <div className="flex flex-col justify-center items-start w-2/5">
        <h1 className="text-md  text-gray-900 font-bold">{user.name}</h1>
        <h1 className="text-sm  text-gray-400">email: {user.email}</h1>
      </div>
      <div className="flex flex-col text-gray-900 justify-center items-start w-1/5">
        <h1 className="text-md font-bold"> {formatDate(user.createdAt)}</h1>
        <h1 className="text-sm  text-gray-400">
          Status: {user.active === true ? 'ACTIVE' : 'INACTIVATED'}
        </h1>
      </div>
      <div className="flex flex-col text-gray-900 justify-center items-start w-1/5">
        <h1 className="text-md font-bold">{formatDate(user.updatedAt)}</h1>
        <h1 className="text-sm  text-gray-400">Funds $: {user.funds.toLocaleString()}</h1>
      </div>
      <div className="flex flex-col text-gray-900 justify-center items-start w-1/5">
        {user.active === true ? (
          <button           className="m-1 px-4 py-2 bg-red-500 text-white rounded-lg inline-block"          >
            <span>Block</span>
          </button>
        ) : (
          <button className="m-1 px-4 py-2 text-white bg-primary-green rounded-lg inline-block">
            <span>Unblock</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminUserCard;
