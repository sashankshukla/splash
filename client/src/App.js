import Navbar from './components/Navbar/Navbar';
import UserDashboard from './components/UserDashboard/UserDashboard';
import Listings from './components/Listings/Listings';
import Pools from './components/Pools/Pools';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home/Home';
import AddFunds from './components/UserDashboard/AddFunds';
import Map from './components/Map/Map.jsx';
import { GoogleLogin } from '@react-oauth/google';
import { useSelector, useDispatch } from 'react-redux';
import ListingForm from './components/Listings/ListingForm';

const App = () => {
  const token = useSelector((store) => store.auth.token);

  return (
    <div className="App bg-gray-100">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<UserDashboard />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/pools" element={<Pools />} />
          <Route path="/payment" element={<AddFunds />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
