import React from 'react';

const Listing = ({
  id,
  name,
  street,
  city,
  country,
  postalCode,
  description,
  price,
  images,
  status,
  createdBy,
  onClick,
}) => {
  const moreImages = (images) => {
    if (images.length > 1) {
      return <p>&#40;+ {images.length - 1} more images&#41;</p>;
    } else {
      return null;
    }
  };

  return (
    <div id={id} className="bg-white rounded-lg shadow-lg p-4 m-8 w-64" onClick={onClick}>
      <img src={images[0]} width={500} height={500} alt=""></img>
      {moreImages(images)}
      <h2 className="text-2xl font-bold mb-2">{name}</h2>
      <h5 className="listing-location">
        Located at {street} in {city}, {country} {postalCode}
      </h5>
      <p className="text-gray-600 mb-2">Price: {price}</p>
      <p className="text-gray-600 mb-2">Seller: {createdBy}</p>
      <p className="listing-status">{status}</p>
    </div>
  );
};

export default Listing;
