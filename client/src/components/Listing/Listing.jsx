import React from 'react';
import './Listing.css';

const Listing = ({ id, title, description, price, location, images, seller, status, onClick }) => {
  return (
    <div id={id} className="listing-container" onClick={onClick}>
      <img src={images} alt="House" className="listing-image" />
      <h2 className="listing-title">{location}</h2>
      <p className="listing-info">Price: {price}</p>
      <p className="listing-info">Seller: {seller}</p>
      <p className="listing-info">open pools</p>
    </div>

    // key = {listing.listingId}
    // title = {listing.title}
    // description = {listing.description}
    // price = {listing.price}
    // location = {listing.location}
    // images = {listing.images}
    // seller = {listing.seller}
    // status = {listing.status}
    // onClick = {null}
  );
};

export default Listing;
