import Navbar from './components/Navbar/Navbar';
import UserDashboard from './components/UserDashboard/UserDashboard';
import Listings from './components/Listings/Listings';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import AddFunds from './components/UserDashboard/AddFunds';
import SellerListings from './components/UserDashboard/SellerDashboard/SellerListings';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<UserDashboard />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/payment" element={<SellerListings />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
