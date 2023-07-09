import React from 'react';

import './Listing.css';

const Listing = ({ id, name, street, city, country, postalCode, description, price, images, status, createdBy, onClick }) => {
  const moreImages = (images) => {
    if (images.length > 1) {
      return <p>&#40;+ {images.length - 1} more images&#41;</p>;
    } else {
      return null;
    }
  };

  return (
    <div id={id} className="listing-container" onClick={onClick}>
      <img src={images[0]} width={500} height={500} alt=""></img>
      {moreImages(images)}
      {/* TODO: have this render more inconspicuously near the bottom right corner of the image */}
      <h2 className="listing-title">{name}</h2>
      <h5 className="listing-location">Located at {street} in {city}, {country} {postalCode}</h5>
      <p className="listing-info">Price: {price}</p>
      <p className="listing-info">Seller: {createdBy}</p>
      <p className="listing-info">Open Pools TODO</p>
      <p className="listing-status">{status}</p>
      {/* How to turn status from bool to open/closed? */}
    </div>
  );
};

export default Listing;
