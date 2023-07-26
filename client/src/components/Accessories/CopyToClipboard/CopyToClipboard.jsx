import React, { useState, useEffect } from 'react';
import { FaClipboard } from 'react-icons/fa';

const CopyToClipboard = ({ value }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  useEffect(() => {
    setIsCopied(false);
  }, [value]);

  return (
    <div className="relative ml-2">
      <button className="text-blue-400 hover:text-blue-500" onClick={handleCopy}>
        <FaClipboard size={20} />
      </button>
      {isCopied && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-32 bg-white text-black border border-gray-900 text-center rounded-md p-1">
          Copied!
        </div>
      )}
    </div>
  );
};

export default CopyToClipboard;
