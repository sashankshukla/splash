import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearUser } from '../../features/auth/authSlice';

function AccountOptions() {
  const token = useSelector((store) => store.auth.token);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <div className="relative" ref={ref}>
      <img
        alt="Logged in user"
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
              <Link to="/account">Add Account</Link>
            </li>
            <li className="py-2 cursor-pointer text-center hover:bg-light hover:text-primary">
              <button onClick={() => dispatch(clearUser())}>Logout</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default AccountOptions;
