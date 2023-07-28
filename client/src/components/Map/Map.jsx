import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Geocode from 'react-geocode';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import Listing from '../Listing/Listing';
import { fetchListings, getListingsData } from '../../features/listings/listingsSlice';
import ListingModal from '../Listing/ListingModal';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCvLLfCqg_bT9DCOffOazrarR7dX4H2_P8',
  });

  const dispatch = useDispatch();

  //styling
  const modalStyles = {
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 'auto',
      height: 'auto', // Update height to auto
      background: '#fff',
      padding: '10px',
      boxSizing: 'border-box',
    },
    overlay: {
      background: 'rgba(0, 0, 0, 0.0)',
      zIndex: 9999,
    },
  };

  // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
  Geocode.setApiKey('AIzaSyCvLLfCqg_bT9DCOffOazrarR7dX4H2_P8');

  // set response language. Defaults to english.
  Geocode.setLanguage('en');

  // States
  const { listings, isError, isSuccess, isLoading, message } = useSelector(getListingsData);
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //grabs users current location
  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  useEffect(() => {
    // dispatch(fetchListings());
    const fetchUserLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        const { latitude, longitude } = data;
        setCenter({ lat: latitude, lng: longitude });
      } catch (error) {
        console.error('Error fetching user location:', error);
      }
    };

    fetchUserLocation();
  }, [dispatch]);

  useEffect(() => {
    const geocodeAddress = async (listing) => {
      try {
        const formattedAddress = `${listing.address.street},${listing.address.city},${listing.address.country},${listing.address.postalCode}`;
        Geocode.fromAddress(formattedAddress).then(
          (response) => {
            const { lat, lng } = response.results[0].geometry.location;

            const marker = { lat: lat, lng: lng, object: listing };
            setMarkers((prevMarkers) => [...prevMarkers, marker]);
          },
          (error) => {
            console.error(error);
          },
        );
      } catch (error) {
        console.error('Error geocoding address:', error);
      }
    };
    listings.forEach((listing) => {
      geocodeAddress(listing);
    });
  }, [dispatch, listings]);

  const onLoad = React.useCallback(
    function callback(map) {
      // sets to current IP
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);

      setMap(map);
    },
    [center],
  );

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);

    setIsModalOpen(true);
  };

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => handleMarkerClick(marker)}
          />
        ))}
      </GoogleMap>
      {selectedMarker && (
        <ListingModal
          selectedListing={selectedMarker.object}
          setSelectedListing={setSelectedMarker}
        />
      )}
    </div>
  ) : (
    <></>
  );
}

export default Map;
