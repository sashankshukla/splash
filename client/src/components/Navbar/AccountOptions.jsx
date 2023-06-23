import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function AccountOptions() {
  const token = useSelector((store) => store.auth.token);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Cleanup
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <div className="relative" ref={ref}>
      <img
        className="rounded-3xl cursor-pointer border-primary border-2"
        src={token.picture}
        height={40}
        width={40}
        onClick={toggleVisibility}
      />
      {visible && (
        <div className="absolute right-0 top-0 mt-12 w-48 bg-white rounded-md shadow-2xl">
          <ul className="text-primary">
            <li className="py-2 cursor-pointer text-center hover:bg-light hover:text-primary">
              <Link to="/profile">View Profile</Link>
            </li>
            <li className="py-2 cursor-pointer text-center hover:bg-light hover:text-primary">
              <Link to="/payment">Add Funds</Link>
            </li>
            <li className="py-2 cursor-pointer text-center hover:bg-light hover:text-primary">
              Withdraw Funds
            </li>
            {/* Add more options as needed */}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AccountOptions;
