import React from 'react';
import { useSelector } from 'react-redux';

const Toggle = ({ name1, name2, name3, toggle, setToggle }) => {
  const user = useSelector((store) => store.auth.user);

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center justify-center mt-6">
      <div className="p-4">
        <div className="flex justify-around mt-4">
          <button
            onClick={() => setToggle('Buyer')}
            className={`py-2 px-4 rounded ${
              toggle === 'Buyer' ? 'bg-green-800 text-white' : 'bg-gray-200'
            }`}
          >
            {name1}
          </button>
          <button
            onClick={() => setToggle('Seller')}
            className={`py-2 px-4 rounded ${
              toggle === 'Seller' ? 'bg-green-800 text-white' : 'bg-gray-200'
            }`}
          >
            {name2}
          </button>
          {user.admin && (
            <button
              onClick={() => {
                setToggle('Admin');
              }}
              className={`py-2 px-4 rounded ${
                toggle === 'Admin' ? 'bg-green-800 text-white' : 'bg-gray-200'
              }`}
            >
              {name3}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Toggle;
