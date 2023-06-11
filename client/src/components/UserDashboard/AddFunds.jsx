import React, { useState } from 'react';

const AddFunds = () => {
  const [form, setForm] = useState({
    accountName: '',
    accountNumber: '',
    bankName: '',
    amount: '',
  });

  const handleInputChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(form);
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
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md group hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Confirm Transfer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFunds;
