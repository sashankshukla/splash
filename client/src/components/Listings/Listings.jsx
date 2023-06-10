import React from "react";

import './Listings.css'

import Listing from '../TempListing/TempListing'

import Filter from '../Filter/Filter'

const Listings = () => {
    return (
        <div id="listings-page-container" className="flex flex-col justify-center items-center pt-16 mx-4">
            <Filter />
            <div id="listings-container" className="flex flex-wrap justify-center items-center p-2 overflow-hidden">
                {/* From https://flowbite.com/docs/components/card/ */}
                {/* <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">HELLO,</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">World</p>
                </div>

                <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">HELLO,</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">World</p>
                </div>

                <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">HELLO,</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">World</p>
                </div>

                <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">HELLO,</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">World</p>
                </div>

                <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">HELLO,</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">World</p>
                </div>

                <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">HELLO,</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">World</p>
                </div>

                <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">HELLO,</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">World</p>
                </div> */}

                <Listing
                    address="123 Main St"
                    price="$500,000"
                    owner="John Doe"
                    imageSrc="https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg"
                    openPools={5}
                    onDetailsClick={() => {
                    // Handle onDetailsClick event
                    }}
                />
                <Listing
                    address="123 Main St"
                    price="$500,000"
                    owner="John Doe"
                    imageSrc="https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg"
                    openPools={5}
                    onDetailsClick={() => {
                    // Handle onDetailsClick event
                    }}
                />
                <Listing
                    address="123 Main St"
                    price="$500,000"
                    owner="John Doe"
                    imageSrc="https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg"
                    openPools={5}
                    onDetailsClick={() => {
                    // Handle onDetailsClick event
                    }}
                />
                <Listing
                    address="123 Main St"
                    price="$500,000"
                    owner="John Doe"
                    imageSrc="https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg"
                    openPools={5}
                    onDetailsClick={() => {
                    // Handle onDetailsClick event
                    }}
                />
                <Listing
                    address="123 Main St"
                    price="$500,000"
                    owner="John Doe"
                    imageSrc="https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg"
                    openPools={5}
                    onDetailsClick={() => {
                    // Handle onDetailsClick event
                    }}
                />

            </div>
        </div>
    );
}
export default Listings;