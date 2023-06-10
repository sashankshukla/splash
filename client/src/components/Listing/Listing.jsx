import React, { useState } from 'react';
import './Listing.css';

const Listing = ({ address, price, owner, imageSrc, openPools }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleListingClick = () => {
    setIsExpanded(true);
  };

  if (isExpanded) {
    return (
      <div className="expanded-listing-container" onClick={() => setIsExpanded(false)}>
        <img src={imageSrc} alt="House" className="expanded-listing-image" />
        <h2 className="expanded-listing-title">{address}</h2>
        <p className="listing-info">Price: {price}</p>
        <p className="listing-info">Owner: {owner}</p>
        <p className="listing-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut gravida tortor. Nunc luctus sapien tellus, ut dapibus nisl sagittis vel. Nunc blandit libero non nunc imperdiet, eget finibus magna luctus. Quisque luctus ultrices nulla, id imperdiet sapien lacinia id. Donec pellentesque in odio a volutpat. Nam ligula ligula, feugiat nec est a, interdum tincidunt enim. </p>
        <p className="listing-info">{openPools} open pools</p>
      </div>
    );
  }

  return (
    <div className="listing-container" onClick={handleListingClick}>
      <img src={imageSrc} alt="House" className="listing-image" />
      <h2 className="listing-title">{address}</h2>
      <p className="listing-info">Price: {price}</p>
      <p className="listing-info">Owner: {owner}</p>
      <p className="listing-info">{openPools} open pools</p>
    </div>
  );
};

export default Listing;
