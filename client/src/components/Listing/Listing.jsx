import React from 'react';
import './Listing.css';

const Listing = ({ address, price, owner, imageSrc, openPools, onClick }) => {
  return (
    <div className="listing-container" onClick={onClick}>
      <img src={imageSrc} alt="House" className="listing-image" />
      <h2 className="listing-title">{address}</h2>
      <p className="listing-info">Price: {price}</p>
      <p className="listing-info">Owner: {owner}</p>
      <p className="listing-info">{openPools} open pools</p>
    </div>
  );
};

export default Listing;
