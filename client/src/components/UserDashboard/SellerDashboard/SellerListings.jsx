import React, { useRef } from 'react';
import Listing from '../../Listing/Listing';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

const SellerListings = () => {
  const listings = [
    {
      address: '123 Main St',
      price: '$500,000',
      owner: 'John Doe',
      imageSrc:
        'https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
      openPools: 11,
      status: true,
    },
    {
      address: '2389 Alley Way',
      price: '$20,000,000',
      owner: 'Susan Brown',
      imageSrc:
        'https://images.unsplash.com/photo-1684695414418-b76c47bfb731?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      openPools: 5,
      status: true,
    },
    {
      address: 'Fresh Fruit Stand',
      price: '$240,000',
      owner: 'Kyle Rogers',
      imageSrc:
        'https://images.unsplash.com/photo-1683210063799-2d8cdd938982?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDl8eGpQUjRobGtCR0F8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      openPools: 2,
      status: false,
    },
    {
      address: "Knot's Berry Farm",
      price: '$534,295,225',
      owner: 'Shaq',
      imageSrc:
        'https://images.unsplash.com/photo-1684378784787-1b8ca456118e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDV8eGpQUjRobGtCR0F8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      openPools: 7,
      status: true,
    },
    {
      address: 'Color Me Studio',
      price: '$50,000',
      owner: 'Lisa Flynn',
      imageSrc:
        'https://images.unsplash.com/photo-1684569546963-792efe6b2a10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0Mnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      openPools: 3,
      status: false,
    },
  ];
  const scrollContainer = useRef(null);

  const scroll = (scrollOffset) => {
    scrollContainer.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-6xl overflow-x-hidden">
        <button onClick={() => scroll(-300)} className="text-3xl font-bold mr-8">
          <FaArrowAltCircleLeft />
        </button>
        <div
          ref={scrollContainer}
          className="flex overflow-x-scroll px-4 lg:space-x-4 md:space-x-2 space-x-1"
        >
          {listings.map((listing, index) => (
            <div key={index} className="flex-none md:w-1/2 lg:w-1/3">
              <Listing {...listing} />
              <div
                key={index}
                className={`p-4 m-2 ${listing.status ? 'text-green-800' : 'text-red-500'}`}
              >
                {listing.status ? 'Active' : 'Closed'}
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => scroll(325)} className="text-3xl font-bold ml-8">
          <FaArrowAltCircleRight />
        </button>
      </div>
    </div>
  );
};

export default SellerListings;
