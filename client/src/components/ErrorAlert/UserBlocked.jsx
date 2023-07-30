import React from 'react';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../features/auth/authSlice';
import { FaFrown } from 'react-icons/fa';

const UserBlocked = () => {
  const dispatch = useDispatch();
  dispatch(clearUser());
  return (
    <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white p-4 rounded-lg">
        <p className="text-center">
          Sorry, your account has been blocked by the server admin <FaFrown />
        </p>
      </div>
    </section>
  );
};

export default UserBlocked;
