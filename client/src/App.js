import Navbar from './components/Navbar/Navbar';
import UserDashboard from './components/UserDashboard/UserDashboard';
import Listings from './components/Listings/Listings';
import Pools from './components/Pools/Pools';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import AddFunds from './components/UserDashboard/AddFunds';
import AddAccount from './components/UserDashboard/AddAccount';
import Map from './components/Map/Map.jsx';
import UserBlocked from './components/ErrorAlert/UserBlocked';

const App = () => {
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
          <Route path="/account" element={<AddAccount />} />
          <Route path="/404" element={<UserBlocked />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
