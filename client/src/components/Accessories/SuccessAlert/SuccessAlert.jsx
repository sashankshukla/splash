import React from 'react';

const SuccessAlert = ({ message }) => {
  return (
    <div
      role="alert"
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    >
      <div className="bg-blue-500 text-white font-bold rounded-t px-4 py-2">Success!</div>
      <div className="border border-t-0 border-blue-400 rounded-b bg-blue-100 px-4 py-3 text-blue-700">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default SuccessAlert;
