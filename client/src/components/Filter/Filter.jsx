import React from 'react';

import './Filter';

function Filter() {
  return (
    <div id="" className="min-w-full">
      <div
        id=""
        className="flex justify-content-space-between w-full bg-white rounded-md border-[0.5px] border-gray-900 shadow-md p-2 hover:shadow-xl focus-within:border-[1.5px]"
      >
        <input
          id="search-bar"
          className="flex-auto px-1"
          type="search"
          placeholder="Search"
        ></input>
        <div id="" className="flex-none px-4">
          FILTERS
        </div>
      </div>
    </div>
  );
}
export default Filter;
