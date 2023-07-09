import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Geocode from 'react-geocode';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import Listing from '../Listing/Listing';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCQmJgx014LgBFrFmkyVMqF_mPmMy52o_M',
  });

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
      background: 'rgba(0, 0, 0, 0.3)',
      zIndex: 9999,
    },
  };

  // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
  Geocode.setApiKey('AIzaSyCQmJgx014LgBFrFmkyVMqF_mPmMy52o_M');

  // set response language. Defaults to english.
  Geocode.setLanguage('en');

  // States
  const listings = useSelector((state) => state.listings);
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //grabs users current location
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        console.log('IP Address at: ' + data.city + ',' + data.country);
        const { latitude, longitude } = data;
        setCenter({ lat: latitude, lng: longitude });
      } catch (error) {
        console.error('Error fetching user location:', error);
      }
    };

    fetchUserLocation();
  }, []);

  useEffect(() => {
    const geocodeAddress = async (listing) => {
      try {
        Geocode.fromAddress(listing.location).then(
          (response) => {
            const { lat, lng } = response.results[0].geometry.location;
            console.log(lat, lng);
            const marker = { lat: lat, lng: lng, object: listing.object };
            setMarkers((prevMarkers) => [...prevMarkers, marker]);
            console.log('marker:');
            console.log(marker);
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
      geocodeAddress({
        location: listing.location,
        object: listing,
      });
    });
  }, []);

  const onLoad = React.useCallback(function callback(map) {
    // sets to current IP
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return isLoaded ? (
    <div>
      {' '}
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
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        style={modalStyles}
        className="fixed right-0 top-0 w-1/4 h-full transform translate-x-full transition-transform duration-300 ease-in-out bg-white p-4"
        overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30 z-50"
        ariaHideApp={false}
      >
        {selectedMarker && (
          <div>
            <Listing
              id={selectedMarker.object.listingId}
              title={selectedMarker.object.title}
              location={selectedMarker.object.location}
              description={selectedMarker.object.description}
              price={selectedMarker.object.price}
              images={selectedMarker.object.images}
              seller={selectedMarker.object.seller}
              status={selectedMarker.object.status}
              onClick={null}
            />
          </div>
        )}
        <button
          className="bg-gray-500 text-white px-4 py-2 mt-4 rounded hover:bg-gray-600"
          onClick={handleCloseModal}
        >
          Close Modal
        </button>
      </Modal>
    </div>
  ) : (
    <></>
  );
}

export default Map;