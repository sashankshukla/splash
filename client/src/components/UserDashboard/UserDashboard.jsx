import React, { useState, useEffect } from 'react';
import BuyerDashboard from './BuyerDashboard/BuyerDashboard';
import SellerDashboard from './SellerDashboard/SellerDashboard';
import Toggle from '../Toggle/Toggle';
import ProfileOverview from './ProfileOverview';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserDashboard = () => {
  const navigate = useNavigate();
  const token = useSelector((store) => store.LoginData.token);
  const [toggle, setToggle] = useState(true);
  useEffect(() => {
    if (Object.keys(token).length === 0) {
      navigate('/');
    }
  }, [token, navigate]);
  return (
    Object.keys(token).length > 0 && (
      <div className="flex flex-col justify-center items-center pt-16 mx-8">
        <div className="min-h-screen">
          <ProfileOverview />
          <Toggle
            name1={'Buyer Profile'}
            name2={'Seller Profile'}
            toggle={toggle}
            setToggle={setToggle}
          />
          {toggle ? <BuyerDashboard /> : <SellerDashboard />}
        </div>
      </div>
    )
  );
};

export default UserDashboard;
