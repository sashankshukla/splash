import Navbar from './components/Navbar/Navbar';
import UserDashboard from './components/UserDashboard/UserDashboard';
import Listings from './components/Listings/Listings';
import Pools from './components/Pools/Pools';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import AddFunds from './components/UserDashboard/AddFunds';
import AddAccount from './components/UserDashboard/AddAccount';
import Map from './components/Map/Map.jsx';

const App = () => {
  return (
    <div className="App bg-gray-100">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/profile" element={<UserDashboard />} />
          <Route exact path="/listings" element={<Listings />} />
          <Route exact path="/pools" element={<Pools />} />
          <Route exact path="/payment" element={<AddFunds />} />
          <Route exact path="/map" element={<Map />} />
          <Route exact path="/account" element={<AddAccount />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
