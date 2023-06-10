import React from "react";

import './Listings.css'

import Listing from '../Listing/Listing'

import Filter from '../Filter/Filter'

const Listings = () => {
    return (
        <div id="listings-page-container" className="flex flex-col justify-center items-center pt-16 mx-4">
            <Filter />
            <div id="listings-container" className="flex flex-wrap content-evenly p-2 overflow-hidden">

                <Listing
                    address="123 Main St"
                    price="$500,000"
                    owner="John Doe"
                    imageSrc="https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg"
                    openPools={11}
                    onDetailsClick={() => {
                    // Handle onDetailsClick event
                    }}
                />
                <Listing
                    address="2389 Alley Way"
                    price="$20,000,000"
                    owner="Susan Brown"
                    imageSrc="https://images.unsplash.com/photo-1684695414418-b76c47bfb731?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                    openPools={5}
                    onDetailsClick={() => {
                    // Handle onDetailsClick event
                    }}
                />
                <Listing
                    address="Fresh Fruit Stand"
                    price="$240,000"
                    owner="Kyle Rogers"
                    imageSrc="https://images.unsplash.com/photo-1683210063799-2d8cdd938982?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDl8eGpQUjRobGtCR0F8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
                    openPools={2}
                    onDetailsClick={() => {
                    // Handle onDetailsClick event
                    }}
                />
                <Listing
                    address="Knot's Berry Farm"
                    price="$534,295,225"
                    owner="Shaq"
                    imageSrc="https://images.unsplash.com/photo-1684378784787-1b8ca456118e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDV8eGpQUjRobGtCR0F8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
                    openPools={7}
                    onDetailsClick={() => {
                    // Handle onDetailsClick event
                    }}
                />
                <Listing
                    address="Color Me Mine Art Studio"
                    price="$50,000"
                    owner="Lisa Flynn"
                    imageSrc="https://images.unsplash.com/photo-1684569546963-792efe6b2a10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0Mnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
                    openPools={3}
                    onDetailsClick={() => {
                    // Handle onDetailsClick event
                    }}
                />

            </div>
        </div>
    );
}
export default Listings;