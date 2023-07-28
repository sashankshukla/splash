import React, { useState, useEffect } from 'react';
import BuyerDashboard from './BuyerDashboard/BuyerDashboard';
import SellerDashboard from './SellerDashboard/SellerDashboard';
import Toggle from '../Toggle/Toggle';
import ProfileOverview from './ProfileOverview';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminDashboard from './AdminDashBoard/AdminDashboard';
import { fetchUser } from '../../features/auth/authSlice';


const UserDashboard = () => {
  const navigate = useNavigate();
  const token = useSelector((store) => store.auth.token);
  const user = useSelector((store) => store.auth.user);

  const [toggle, setToggle] = useState('Buyer');
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(token).length === 0) {
      navigate('/');
    }
    dispatch(fetchUser());
  }, [token, navigate]);

  console.log('userDashboard');
  if (user && !user.active) {
    navigate('/404');
  }

  return (
    Object.keys(token).length > 0 && (
      <div className="flex flex-col justify-center items-center pt-16 mx-8">
        <div className="min-h-screen">
          <ProfileOverview />
          <Toggle
            name1={'Buyer Profile'}
            name2={'Seller Profile'}
            name3={'Admin'}
            toggle={toggle}
            setToggle={setToggle}
          />
          {toggle === 'Buyer' ? (
            <BuyerDashboard />
          ) : toggle === 'Seller' ? (
            <SellerDashboard />
          ) : (
            <AdminDashboard />
          )}
        </div>
      </div>
    )
  );
};

export default UserDashboard;
