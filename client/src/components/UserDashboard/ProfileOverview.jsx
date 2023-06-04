import React from 'react';

const ProfileOverview = () => {
    let current_hour = (new Date()).getHours();
    let greeting;
    if (current_hour < 12) {
      greeting = 'Good morning';
    } else if (current_hour < 18) {
      greeting = 'Good afternoon';
    } else {
      greeting = 'Good evening';
    }

  return (
    <div className="w-full h-full bg-white rounded-xl shadow-md overflow-hidden px-12">
      <div className="p-8">
        <div className="text-md font-semibold text-gray-400">
          {greeting}, Sashank. Your portfolio is worth
        </div>
        <div className="text-5xl font-bold">
          $2,345.61 <span className="text-2xl text-gray-500">CAD</span>
        </div>
        <hr className="my-4" />
        <div className="uppercase tracking-wide text-sm text-green-800 font-semibold">
          Sashank Shukla
        </div>
        <p className="block mt-1 text-lg leading-tight font-medium text-black">
          ayaz.shukla@gmail.com
        </p>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex flex-col justify-start items-start w-full md:w-1/3">
            <p className="mt-2 text-gray-500">Member since: Jan 2023</p>
            <p className="mt-2 text-gray-500">Assets Owned: 10</p>
            <p className="mt-2 text-gray-500">Assets Value: $1867.31</p>
            <p className="mt-2 text-gray-500">Part of Pools: 4</p>
          </div>
          <div
            class="px-4 py-6 mt-8 md:-mt-12 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 w-full md:w-2/3"
          >
            <div class="flex items-center">
              <svg
                aria-hidden="true"
                class="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Info</span>
              <h3 class="text-lg font-medium">Deposit funds to trade on Splash</h3>
            </div>
            <div class="mt-2 mb-4 text-sm">
              Move funds from other bank accounts, including TFSA's, RRSP's, and more. We'll cover
              the transfer fee. Invest in all types of assets either individually or through pools.
            </div>
            <div class="flex">
              <button
                type="button"
                class="text-white bg-green-800 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center"
              >
                Add Funds
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
