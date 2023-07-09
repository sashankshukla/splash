import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './Filter.css';
import { FaSearch } from 'react-icons/fa';

function Filter() {
  const dispatch = useDispatch();

  const [optionsVisible, setVisibility] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  const handleChange = (e) => {
    setSearchFilter(e.target.value);
    dispatch({
      type: 'filter/applyFilters',
      payload: {
        keywords: e.target.value,
      },
    });
  };

  return (
    <div className="min-w-full">
      <div className="flex items-stretch justify-between w-full bg-white rounded-md border-[0.5px] border-gray-900 shadow-md hover:shadow-xl focus-within:outline-none focus-within:ring-0 px-2 py-1 relative text-xl">
        <div className="relative">
          <button
            className="px-4 flex flex-row items-stretch justify-center text-white font-medium bg-primary-darkgreen rounded-lg duration-150 w-full h-full"
            onClick={() => setVisibility(!optionsVisible)}
          >
            <span>Add Filter</span>
          </button>

          {optionsVisible && (
            <div className="absolute left-0 w-64 mt-2 p-2 bg-white border border-gray-200 rounded shadow-lg divide-y divide-gray-200">
              <div className="py-1">
                <span className="block text-sm text-gray-700">Price Range</span>
                <input
                  id="price-range-lower-input"
                  type="number"
                  step="0.01"
                  placeholder="Lower range"
                  className="mt-1 w-full px-2 py-1 text-sm rounded border border-gray-200"
                />
                <input
                  id="price-range-upper-input"
                  type="number"
                  step="0.01"
                  placeholder="Upper range"
                  className="mt-1 w-full px-2 py-1 text-sm rounded border border-gray-200"
                />
              </div>

              <div className="py-1">
                <span className="block text-sm text-gray-700">Sort by Listing Status</span>
                <select
                  id="status-select"
                  className="mt-1 w-full px-2 py-1 text-sm rounded border border-gray-200"
                >
                  <option value="All">All Listings</option>
                  <option value="Available">Available Listings Only</option>
                  <option value="Sold">Sold Listings Only</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="flex-grow">
          <input
            id="search-bar-input"
            className="px-1 w-full h-full border-none focus:outline-none focus:ring-0"
            type="search"
            value={searchFilter}
            onChange={handleChange}
            placeholder="Search"
          />
        </div>

        <div className="flex-none">
          <button
            id="submit-search-button"
            className="w-full h-full flex flex-row items-center justify-center"
            onClick={() => {
              dispatch({
                type: 'filter/applyFilters',
                payload: {
                  keywords: searchFilter,
                },
              });
            }}
          >
            <FaSearch />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
