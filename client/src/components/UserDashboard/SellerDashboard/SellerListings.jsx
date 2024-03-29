import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Listing from '../../Listings/Listing/Listing';

import NoResults from '../../Accessories/NoResults/NoResults';

import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

const SellerListings = () => {
  const token = useSelector((state) => state.auth.auth_token);
  const URL =
    process.env.NODE_ENV === 'production'
      ? 'https://splash-server.onrender.com'
      : 'http://localhost:5001';

  const fetchUserListings = async (token) => {
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };

    const response = await axios.get(`${URL}/listings/user`, config);
    return response.data;
  };

  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    async function setUListings() {
      const userTempListings = await fetchUserListings(token);
      setUserListings(userTempListings);
    }

    setUListings();
  }, [token]);

  const scrollContainer = useRef(null);

  const scroll = (scrollOffset) => {
    const container = scrollContainer.current;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    if (
      (container.scrollLeft + scrollOffset > maxScrollLeft && scrollOffset > 0) ||
      (container.scrollLeft + scrollOffset < 0 && scrollOffset < 0)
    ) {
      return;
    } else {
      container.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-screen max-w-6xl overflow-x-hidden">
        <button onClick={() => scroll(-335)} className="text-3xl font-bold mr-8">
          <FaArrowAltCircleLeft />
        </button>
        <div
          ref={scrollContainer}
          className="flex items-center justify-around overflow-x-scroll px-4 lg:space-x-4 md:space-x-2 space-x-1"
        >
          {userListings.length === 0 && <NoResults />}

          {userListings.length > 0 &&
            userListings.map((listing, index) => (
              <div key={index} className="flex-none md:w-1/2 lg:w-1/3">
                <Listing
                  {...listing}
                  street={listing.address.street}
                  city={listing.address.city}
                  postalCode={listing.address.postalCode}
                />
              </div>
            ))}
        </div>
        <button onClick={() => scroll(335)} className="text-3xl font-bold ml-8">
          <FaArrowAltCircleRight />
        </button>
      </div>
    </div>
  );
};

export default SellerListings;
