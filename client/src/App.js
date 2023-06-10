import Navbar from './components/Navbar/Navbar';
import UserDashboard from './components/UserDashboard/UserDashboard';
import Listings from './components/Listings/Listings';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/profile" element={<UserDashboard />} />
          <Route path="/listings" element={<Listings />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
