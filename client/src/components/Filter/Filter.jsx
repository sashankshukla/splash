import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateFilter, clearFilter } from '../../features/listings/listingsSlice';
import { FaSearch, FaFilter } from 'react-icons/fa';

function Filter() {
  const dispatch = useDispatch();

  const [optionsVisible, setVisibility] = useState(false);

  const maxP = 1000000000;

  const initialState = {
    keywordSearch: '',
    sortTime: 'None',
    sortPrice: 'None',
    price: {
      lower: 0,
      upper: maxP,
    },
    distance: {
      check: false,
      range: 0,
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
  };

  const handleSortChange = (e) => {
    setListingFilterData({
      ...listingFilterData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePriceChange = (e) => {
    if (e.target.value) {
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
  };

  const handleSubmit = (e) => {
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
      cbs[i].checked = true;
    }
    dispatch(clearFilter());
  };

  const toggleVis = (e) => {
    setVisibility(!optionsVisible);
  };

  useEffect(() => {
    if (optionsVisible) {
      const typeResidence = document.getElementById('invest-res-cb');
      typeResidence.checked = listingFilterData.investmentType.residence;
      const typeFranchise = document.getElementById('invest-franchise-cb');
      typeFranchise.checked = listingFilterData.investmentType.franchise;
      const typeGas = document.getElementById('invest-gas-cb');
      typeGas.checked = listingFilterData.investmentType.gasStation;
      const typeStock = document.getElementById('invest-stock-portfolio-cb');
      typeStock.checked = listingFilterData.investmentType.stockPortfolio;
    }
  }, [optionsVisible]);

  useEffect(() => {
    dispatch(updateFilter(listingFilterData));
  }, [listingFilterData]);

  return (
    <div className="min-w-[85%]">
      <div className="flex items-stretch my-8 justify-between w-full h-12 bg-white rounded-md border-gray-900 shadow-md hover:shadow-xl focus-within:outline-none focus-within:ring-0 px-2 py-2 relative text-xl transition duration-0 hover:duration-300 ease-in-out">
        <div className="flex-none">
          <button
            id="submit-search-button"
            className="px-2 w-full h-full flex flex-row items-center justify-center text-primary-darkgreen"
            onClick={handleSubmit}
          >
            <FaSearch />
          </button>
        </div>

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

        <div className="relative">
          <button
            className="px-2 flex flex-row items-center justify-center text-primary-darkgreen font-medium rounded-lg duration-150 mb-1 w-full h-full"
            onClick={toggleVis}
          >
            <span>
              <FaFilter />
            </span>
          </button>

          {optionsVisible && (
            <div className="absolute right-0 w-64 mt-2 p-2 bg-white border border-gray-200 rounded shadow-lg divide-y divide-gray-200">
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

              <span className="block text-md text-gray-700">Filter</span>
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

              <div className="py-1">
                <span className="block text-sm text-gray-700">Show listings with...</span>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Filter;
