import React from 'react';

const Toggle = ({name1, name2 , toggle ,setToggle}) => {
  return (
    <div className="flex items-center justify-center mt-6">
      <div className="p-4">
        <div className="flex justify-around mt-4">
          <button
            onClick={() => setToggle(true)}
            className={`py-2 px-4 rounded ${toggle ? 'bg-green-800 text-white' : 'bg-gray-200'}`}
          >
            {name1}
          </button>
          <button
            onClick={() => setToggle(false)}
            className={`py-2 px-4 rounded ${!toggle ? 'bg-green-800 text-white' : 'bg-gray-200'}`}
          >
            {name2}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toggle;
