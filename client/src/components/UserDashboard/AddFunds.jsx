import React, { useState } from 'react';
import { increaseUserFunds } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddFunds = () => {
  const [form, setForm] = useState({
    accountName: '',
    accountNumber: '',
    bankName: '',
    amount: '',
  });

  const user = useSelector((store) => store.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const handleInputChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(increaseUserFunds(form))
      .then((response) => {
        navigate('/profile');
      })
      .catch((error) => {
        if (error) {
          console.log('caught in add funds'); // todo not being caught.
          setIsErrorModalOpen(true);
        }
      });
    navigate('/profile');
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
          Transfer Funds to Splash
        </h2>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="my-3">
              <label htmlFor="accountName" className="sr-only">
                Account Name
              </label>
              <input
                id="accountName"
                name="accountName"
                type="text"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border rounded-none appearance-none focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Account Name"
                onChange={handleInputChange}
              />
            </div>

            <div className="my-3">
              <label htmlFor="accountNumber" className="sr-only">
                Account Number
              </label>
              <input
                id="accountNumber"
                name="accountNumber"
                type="text"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border rounded-none appearance-none focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Account Number"
                onChange={handleInputChange}
              />
            </div>

            <div className="my-3">
              <label htmlFor="bankName" className="sr-only">
                Bank Name
              </label>
              <input
                id="bankName"
                name="bankName"
                type="text"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border rounded-none appearance-none focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Bank Name"
                onChange={handleInputChange}
              />
            </div>

            <div className="my-3">
              <label htmlFor="amount" className="sr-only">
                Amount
              </label>
              <input
                id="amount"
                name="amount"
                type="text"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border rounded-none appearance-none focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Amount"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="pt-5">
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-700 border border-transparent rounded-md group hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Confirm Transfer
            </button>
          </div>
          {isErrorModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-xl font-bold mb-2">Error</h2>
                <p>Oops! Something went wrong. Please try again later.</p>
                <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Close
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddFunds;
