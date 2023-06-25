import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './logo.png';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { addUser } from '../../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import AccountOptions from './AccountOptions';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((store) => store.auth.token);

  const [state, setState] = useState(false);
  const navigation = [
    { title: 'Home', path: '/' },
    { title: 'Listings', path: '/listings' },
    { title: 'Pools', path: '/pools' },
    { title: 'Contact Us', path: '/contact' },
    { title: 'Profile', path: '/profile' },
  ];
  return (
    <section className="w-screen fixed z-20 border-b-[1px] border-gray-900">
      <nav className="bg-white w-full border-b md:border-0 md:static">
        <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <a href="/">
              <img src={logo} width={20} height={10} alt="Splash Logo" />
            </a>
            <div className="md:hidden">
              <button
                className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                onClick={() => setState(!state)}
              >
                {state ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              state ? 'block' : 'hidden'
            }`}
          >
            <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              {navigation.map((item, idx) => {
                if (item.title === 'Profile' && !token.name) {
                  return null;
                }
                if (item.title === 'Pools' && !token.name) {
                  return null;
                }
                return (
                  <li
                    key={idx}
                    className="text-gray-900 hover:text-green-800 hover:font-semibold"
                    onClick={() => setState(!state)}
                  >
                    <Link to={item.path}>{item.title}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="hidden lg:block">
            {Object.keys(token).length === 0 ? (
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  const decoded = jwt_decode(credentialResponse.credential);
                  console.log(decoded);
                  dispatch(addUser({ token: decoded, auth_token: credentialResponse.credential }));
                  navigate('/profile');
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
                useOneTap
              />
            ) : (
              <AccountOptions />
            )}
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
