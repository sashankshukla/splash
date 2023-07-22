import React from 'react';

const PurchaseCard = ({ name, id, purchasePrice, currentPrice, equity }) => {
  const percentageChange = ((currentPrice - equity) / equity) * 100;
  return (
    <div className="flex flex-row justify-between items-center w-full h-24 bg-white border-b-2 border-dashed border-gray-200 hover:bg-gray-200 px-8">
      <div className="flex flex-col justify-center items-start w-2/5">
        <h1 className="text-md  text-gray-900 font-bold">{name}</h1>
        <h1 className="text-sm  text-gray-400">id: {id}</h1>
      </div>
      <div className="flex flex-col text-gray-900 justify-center items-start w-1/5">
        <h1 className="text-md font-bold">$ {equity.toLocaleString()}</h1>
        <h1 className="text-sm  text-gray-400">CAD</h1>
      </div>
      <div className="flex flex-col text-gray-900 justify-center items-start w-1/5">
        <h1 className="text-md font-bold">{((equity / purchasePrice) * 100).toFixed(2)}</h1>
        <h1 className="text-sm  text-gray-400">%</h1>
      </div>
      <div className="flex flex-col text-gray-900 justify-center items-start w-1/5">
        <h1 className="text-md font-bold">$ {currentPrice.toLocaleString()}</h1>
        <h1 className={`text-sm ${percentageChange < 0 ? 'text-red-500' : 'text-green-500'}`}>
          {percentageChange.toFixed(2)}%
        </h1>
      </div>
    </div>
  );
};

export default PurchaseCard;
