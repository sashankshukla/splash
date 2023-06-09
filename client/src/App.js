import React from 'react';
import Listing from './Listing';

const App = () => {
  return (
    <div className="App">
      <Listing
        address="123 Main St"
        price="$500,000"
        owner="John Doe"
        imageSrc="https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg"
        openPools={5}
        onDetailsClick={() => {
          // Handle onDetailsClick event
        }}
      />
    </div>
  );
};

export default App;
