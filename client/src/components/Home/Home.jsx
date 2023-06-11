import React from 'react';
import { FaStar, FaMoneyBillWave, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import HomeImage from './HomeImage.jpg';

const Home = () => {
  const features = [
    {
      name: 'Trusted',
      icon: <FaCheckCircle className="w-5 h-5" />,
    },
    {
      name: 'Over 500+ verified listings',
      icon: <FaMoneyBillWave className="w-5 h-5" />,
    },
    {
      name: '400 ratings',
      icon: <FaStar className="w-5 h-5" />,
    },
  ];

  return (
    <section>
      <div className="w-screen h-screen mx-auto px-4 py-28 gap-12 text-gray-600 bg-green-50 md:px-16 xl:flex">
        <div className="space-y-5 md:mt-28 max-w-2xl mx-auto text-center xl:text-left">
          <div className="flex flex-wrap items-center justify-center gap-6 xl:justify-start">
            {features.map((item, idx) => (
              <div key={idx} className="flex items-center gap-x-2 text-gray-500 text-sm">
                {item.icon}
                {item.name}
              </div>
            ))}
          </div>
          <h1 className="text-4xl text-gray-900 font-extrabold mx-auto md:text-5xl">
            Collectively invest in high return oppurtunities
          </h1>
          <p className="max-w-xl mx-auto xl:mx-0">
            Wanted to see returns on your savings account but don't have large enough capital to
            invest? Splash is an investing platform that enables you to invest in whatever you feel
            like, with how much ever you have.
          </p>
          <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0 xl:justify-start">
            <Link
              to="/listings"
              className="flex items-center justify-center gap-x-2 py-2 px-4 text-white font-medium bg-green-800 duration-150 hover:bg-green-700 rounded-lg md:inline-flex"
            >
              Browse Listings
              <FaArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/profile"
              className="flex items-center justify-center gap-x-2 py-2 px-4 text-gray-800 border-[1px] font-medium bg-white duration-150 hover:bg-gray-100 rounded-lg md:inline-flex"
            >
              Sign in
              <FaArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
        <div className="flex-1 max-w-xl mx-auto mt-14 pb-16 xl:mt-24">
          <div className="relative">
            <img src={HomeImage} className="rounded-lg" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
