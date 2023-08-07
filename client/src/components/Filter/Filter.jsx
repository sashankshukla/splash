import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateFilter, clearFilter } from '../../features/listings/listingsSlice';

import ErrorAlert from '../Accessories/ErrorAlert/ErrorAlert';

import './Filter.css';
import { FaSearch, FaFilter } from 'react-icons/fa';

function Filter() {
  const dispatch = useDispatch();

  //accessory visibility toggles
  //const [errorAlertVisible, setErrorVisibility] = useState(false);

  const [optionsVisible, setVisibility] = useState(false);
  const [distExpand, setDistExpand] = useState(false);

  const maxP = 1000000000;

  const initialState = {
    keywordSearch: '', //make this an array separated by space or smth in future?
    sortTime: 'None',
    sortPrice: 'None',
    price: {
      lower: 0, //min range
      upper: maxP, //max range
    },
    distance: {
      check: false,
      range: 0, //what should default be? what should min and max and increments be?
    },
    status: {
      available: true,
      sold: false,
    },
    pools: {
      open: true,
      closed: true,
      none: true,
    },
    investmentType: {
      residence: true,
      franchise: true,
      gasStation: true,
      stockPortfolio: true,
    },
  };

  const [listingFilterData, setListingFilterData] = useState(initialState);

  const handleKeywordChange = (e) => {
    setListingFilterData({
      ...listingFilterData,
      [e.target.name]: e.target.value,
    });

    console.log(e.target.value);
  };

  const handleSortChange = (e) => {
    setListingFilterData({
      ...listingFilterData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePriceChange = (e) => {
    if(e.target.value) {
      if (e.target.value < 0) {
        setListingFilterData({
          ...listingFilterData,
          price: {
            ...listingFilterData.price,
            [e.target.name]: 0,
          },
        });
      } else {
        setListingFilterData({
          ...listingFilterData,
          price: {
            ...listingFilterData.price,
            [e.target.name]: e.target.value,
          },
        });
      }
    }

    console.log(e.target.value);
  };

  const handleDistanceCheckboxChange = (e) => {
    if (e.target.checked === true) {
      setListingFilterData({
        ...listingFilterData,
        distance: {
          ...listingFilterData.distance,
          [e.target.name]: true,
        },
      });
    } else {
      setListingFilterData({
        ...listingFilterData,
        distance: {
          ...listingFilterData.distance,
          [e.target.name]: false,
        },
      });
    }

    setDistExpand(!distExpand);
  };

  const handleDistanceChange = (e) => {
    setListingFilterData({
      ...listingFilterData,
      distance: {
        ...listingFilterData.distance,
        [e.target.name]: e.target.value,
      },
    });

    console.log(e.target.value);
  };

  const handleStatusChange = (e) => {
    if (e.target.checked === true) {
      setListingFilterData({
        ...listingFilterData,
        status: {
          ...listingFilterData.status,
          [e.target.name]: true,
        },
      });
    } else {
      setListingFilterData({
        ...listingFilterData,
        status: {
          ...listingFilterData.status,
          [e.target.name]: false,
        },
      });
    }

    console.log(listingFilterData.status);
  };

  const handlePoolsChange = (e) => {
    if (e.target.checked === true) {
      setListingFilterData({
        ...listingFilterData,
        pools: {
          ...listingFilterData.pools,
          [e.target.name]: true,
        },
      });
    } else {
      setListingFilterData({
        ...listingFilterData,
        pools: {
          ...listingFilterData.pools,
          [e.target.name]: false,
        },
      });
    }

    console.log(e.target.value);
  };

  const handleInvestmentChange = (e) => {
    if (e.target.checked === true) {
      setListingFilterData({
        ...listingFilterData,
        investmentType: {
          ...listingFilterData.investmentType,
          [e.target.name]: true,
        },
      });
    } else {
      setListingFilterData({
        ...listingFilterData,
        investmentType: {
          ...listingFilterData.investmentType,
          [e.target.name]: false,
        },
      });
    }

    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log('submitted the following listingsFilterData: ');
    console.log(listingFilterData);
    if (listingFilterData.price.lower < 0 || listingFilterData.price.upper < 0) {
      console.log('listing filter validation error placeholder');
    } else {
      dispatch(updateFilter(listingFilterData));
    }
  };

  const clearFilters = (e) => {
    setListingFilterData(initialState);
    let cbs = document.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < cbs.length; i++) {
      // console.log(cbs[i]);
      cbs[i].checked = true;
    }

    // let dl = document.getElementById('distance-limit-cb');
    // dl.checked = false;

    setDistExpand(false);

    dispatch(clearFilter());
  };

  const toggleVis = (e) => {
    setVisibility(!optionsVisible);
  };

  useEffect(() => {
    if (optionsVisible) {
      // const statusAvail = document.getElementById('stat-avail-cb');
      // statusAvail.checked = listingFilterData.status.available;
      // const statusSold = document.getElementById('stat-sold-cb');
      // statusSold.checked = listingFilterData.status.sold;

      // const poolOpen = document.getElementById('open-pool-cb');
      // poolOpen.checked = listingFilterData.pools.open;
      // const poolClosed = document.getElementById('closed-pool-cb');
      // poolClosed.checked = listingFilterData.pools.closed;
      // const poolNone = document.getElementById('no-pool-cb');
      // poolNone.checked = listingFilterData.pools.none;

      const typeResidence = document.getElementById('invest-res-cb');
      typeResidence.checked = listingFilterData.investmentType.residence;
      const typeFranchise = document.getElementById('invest-franchise-cb');
      typeFranchise.checked = listingFilterData.investmentType.franchise;
      const typeGas = document.getElementById('invest-gas-cb');
      typeGas.checked = listingFilterData.investmentType.gasStation;
      const typeStock = document.getElementById('invest-stock-portfolio-cb');
      typeStock.checked = listingFilterData.investmentType.stockPortfolio;

      console.log(listingFilterData);
    }
  }, [optionsVisible]);

  useEffect(() => {
    dispatch(updateFilter(listingFilterData));
  }, [listingFilterData]);

  return (
    <div className="min-w-[85%]">
      <div className="flex items-stretch my-8 justify-between w-full h-12 bg-white rounded-md border-gray-900 shadow-md hover:shadow-xl focus-within:outline-none focus-within:ring-0 px-2 py-2 relative text-xl transition duration-0 hover:duration-300 ease-in-out">
        {/* Submit Search Spyglass Button */}
        <div className="flex-none">
          <button
            id="submit-search-button"
            className="px-2 w-full h-full flex flex-row items-center justify-center text-primary-darkgreen"
            onClick={handleSubmit}
          >
            <FaSearch />
          </button>
        </div>

        {/* Search Bar Input */}
        <div className="flex-grow">
          <input
            id="search-bar-input"
            className="px-1 w-full h-full border-none focus:outline-none focus:ring-0 text-start"
            name="keywordSearch"
            type="search"
            value={listingFilterData.keywordSearch}
            onChange={handleKeywordChange}
            placeholder="Search"
          />
        </div>

        {/* Filter Options Button */}
        <div className="relative">
          <button
            className="px-2 flex flex-row items-center justify-center text-primary-darkgreen font-medium rounded-lg duration-150 mb-1 w-full h-full"
            onClick={toggleVis}
          >
            <span>
              <FaFilter />
            </span>
          </button>

          {/* Options Container */}
          {optionsVisible && (
            <div className="absolute right-0 w-64 mt-2 p-2 bg-white border border-gray-200 rounded shadow-lg divide-y divide-gray-200">
              {/* {errorAlertVisible && <ErrorAlert message="TEST ERROR" />} */}
              {/* SORT */}
              <span className="block text-md text-gray-700">Sort</span>
              <div className="py-1">
                <span className="block text-sm text-gray-700">Timestamp</span>
                <select
                  id="sort-time-select"
                  className="mt-1 w-full px-2 py-1 text-sm rounded border border-gray-200"
                  name="sortTime"
                  value={listingFilterData.sortTime}
                  onChange={handleSortChange}
                >
                  <option value="None">None</option>
                  <option value="Newest First">Newest First</option>
                  <option value="Oldest First">Oldest First</option>
                </select>

                <span className="block text-sm text-gray-700">Price</span>
                <select
                  id="sort-price-select"
                  className="mt-1 w-full px-2 py-1 text-sm rounded border border-gray-200"
                  name="sortPrice"
                  value={listingFilterData.sortPrice}
                  onChange={handleSortChange}
                >
                  <option value="None">None</option>
                  <option value="Low to High">Low to High</option>
                  <option value="High to Low">High to Low</option>
                </select>
              </div>

              {/* FILTER */}
              <span className="block text-md text-gray-700">Filter</span>
              {/* Price Range */}
              <div className="py-1">
                <span className="block text-sm text-gray-700">Price Range</span>

                <label className="text-xs text-gray-700" htmlFor="">
                  Min Price
                </label>
                <input
                  id="price-range-lower-input"
                  className="mt-1 w-full px-2 py-1 text-sm rounded border border-gray-200"
                  name="lower"
                  type="number"
                  step="0.01"
                  value={listingFilterData.price.lower}
                  onChange={handlePriceChange}
                  placeholder="Lower range"
                />

                <label className="text-xs text-gray-700" htmlFor="">
                  Max Price
                </label>
                <input
                  id="price-range-upper-input"
                  className="mt-1 w-full px-2 py-1 text-sm rounded border border-gray-200"
                  name="upper"
                  type="number"
                  step="0.01"
                  value={listingFilterData.price.upper}
                  onChange={handlePriceChange}
                  placeholder="Upper range"
                />
              </div>

              {/* Distance Range -- add expand functionality and show current value */}
              <div className="py-1">
                {/* <span className="max-w-[45%] flex justify-between items-end text-sm text-gray-700">
                  Distance Limit
                  <div className="py-1 flex justify-center items-center">
                    <input
                      id="distance-limit-cb"
                      className=""
                      name="check"
                      type="checkbox"
                      value={listingFilterData.distance.check}
                      onClick={handleDistanceCheckboxChange}
                    />
                  </div>
                </span> */}

                {/* <div className="text-sm">Value for range goes here</div> */}
                {distExpand && (
                  <input
                    id="Distance-limit-input"
                    className="min-w-full"
                    name="range"
                    type="range"
                    min="0"
                    max={maxP}
                    // max should be set to our max price at some point maybe?
                    value={listingFilterData.distance.range}
                    onChange={handleDistanceChange}
                  />
                )}
              </div>

              <div className="py-1">
                <span className="block text-sm text-gray-700">Show listings with...</span>

                {/* <div className="py-1 flex justify-between"> */}
                  {/* Status Checkboxes */}
                  {/* <div className="flex flex-col justify-start items-start">
                    <span className="block text-sm text-gray-700">Status</span>

                    <div className="py-1 flex justify-start items-center">
                      <input
                        id="stat-avail-cb"
                        className=""
                        name="available"
                        type="checkbox"
                        value={listingFilterData.status.available}
                        onClick={handleStatusChange}
                        defaultChecked
                      />
                      <label className="text-xs text-gray-700" htmlFor="">
                        Available
                      </label>
                    </div>

                    <div className="flex justify-start items-center">
                      <input
                        id="stat-sold-cb"
                        className=""
                        name="sold"
                        type="checkbox"
                        value={listingFilterData.status.sold}
                        onChange={handleStatusChange}
                        defaultChecked
                      />
                      <label className="text-xs text-gray-700" htmlFor="">
                        Sold
                      </label>
                    </div>
                  </div> */}

                  {/* Pool Checkboxes */}
                  {/* <div className="flex flex-col justify-start items-start">
                    <span className="block text-sm text-gray-700">Pools</span>

                    <div className="py-1 flex justify-start items-center">
                      <input
                        id="open-pool-cb"
                        className=""
                        name="open"
                        type="checkbox"
                        value={listingFilterData.pools.open}
                        onChange={handlePoolsChange}
                        defaultChecked
                      />
                      <label className="text-xs text-gray-700" htmlFor="">
                        Open Pools
                      </label>
                    </div>

                    <div className="flex justify-start items-center">
                      <input
                        id="closed-pool-cb"
                        className=""
                        name="closed"
                        type="checkbox"
                        value={listingFilterData.pools.closed}
                        onChange={handlePoolsChange}
                        defaultChecked
                      />
                      <label className="text-xs text-gray-700" htmlFor="">
                        Closed Pools
                      </label>
                    </div>

                    <div className="flex justify-start items-center">
                      <input
                        id="no-pool-cb"
                        className=""
                        name="none"
                        type="checkbox"
                        value={listingFilterData.pools.none}
                        onChange={handlePoolsChange}
                        defaultChecked
                      />
                      <label className="text-xs text-gray-700" htmlFor="">
                        No Pools
                      </label>
                    </div>
                  </div>
                </div> */}

                {/* Investment Type Checkboxes */}
                <div className="py-1 flex flex-col">
                  <span className="block text-sm text-gray-700">Investment Type</span>

                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <div className="flex justify-start items-center">
                        <input
                          id="invest-res-cb"
                          className=""
                          name="residence"
                          type="checkbox"
                          value={listingFilterData.investmentType.residence}
                          onChange={handleInvestmentChange}
                          defaultChecked
                        />
                        <label className="text-xs text-gray-700" htmlFor="">
                          Residence
                        </label>
                      </div>

                      <div className="flex justify-start items-center">
                        <input
                          id="invest-franchise-cb"
                          className=""
                          name="franchise"
                          type="checkbox"
                          value={listingFilterData.investmentType.franchise}
                          onChange={handleInvestmentChange}
                          defaultChecked
                        />
                        <label className="text-xs text-gray-700" htmlFor="">
                          Franchise
                        </label>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <div className="flex justify-start items-center">
                        <input
                          id="invest-gas-cb"
                          className=""
                          name="gasStation"
                          type="checkbox"
                          value={listingFilterData.investmentType.gasStation}
                          onChange={handleInvestmentChange}
                          defaultChecked
                        />
                        <label className="text-xs text-gray-700" htmlFor="">
                          Gas Station
                        </label>
                      </div>

                      <div className="flex justify-start items-center">
                        <input
                          id="invest-stock-portfolio-cb"
                          className=""
                          name="stockPortfolio"
                          type="checkbox"
                          value={listingFilterData.investmentType.stockPortfolio}
                          onChange={handleInvestmentChange}
                          defaultChecked
                        />
                        <label className="text-xs text-gray-700" htmlFor="">
                          Stock Portfolio
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <button id="" className="text-sm" onClick={clearFilters}>
                  <u>clear filters</u>
                </button>
              </div>

              {/* <div className="py-1">
                <span className="block text-sm text-gray-700">Status</span>

                <div className="flex justify-around items-center">
                  <div className="py-1 flex flex-col justify-between items-center">
                    <input
                      type="checkbox"
                      checked
                    />
                    <label className="text-xs text-gray-700" htmlFor="">Available</label>
                  </div>

                  <div className="flex flex-col justify-between items-center">
                    <input
                      type="checkbox"
                      checked
                    />
                    <label className="text-xs text-gray-700" htmlFor="">Sold</label>
                  </div>
                </div>
              </div>

              <div className="py-1">
                <span className="block text-sm text-gray-700">Include listings with...</span>

                <div className="flex justify-between items-center">
                  <div className="py-1 flex flex-col justify-between items-center">
                    <input
                      type="checkbox"
                      checked
                    />
                    <label className="text-xs text-gray-700" htmlFor="">Open Pools</label>
                  </div>

                  <div className="flex flex-col justify-between items-center">
                    <input
                      type="checkbox"
                      checked
                    />
                    <label className="text-xs text-gray-700" htmlFor="">Closed Pools</label>
                  </div>

                  <div className="flex flex-col justify-between items-center">
                    <input
                      type="checkbox"
                      checked
                    />
                    <label className="text-xs text-gray-700" htmlFor="">No Pools</label>
                  </div>
                </div>
              </div>

              <div className="py-1">
                <span className="block text-sm text-gray-700">Investment Type</span>
                <select
                  id="status-select"
                  className="mt-1 w-full px-2 py-1 text-sm rounded border border-gray-200"
                >
                  <option value="Housing/Living Accomodation">House/Living Accomodation</option>
                  <option value="Franchise">Franchise</option>
                  <option value="Gas Station">Gas Station</option>
                  <option value="Stock Portfolio">Stock Portfolio</option>
                </select>
              </div> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Filter;
