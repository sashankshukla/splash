import Navbar from './components/Navbar/Navbar';
import UserDashboard from './components/UserDashboard/UserDashboard';
import Listings from './components/Listings/Listings';
import { BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import Home from './components/Home/Home';
import AddFunds from './components/UserDashboard/AddFunds';
import { GoogleLogin } from '@react-oauth/google';
import { useSelector , useDispatch} from 'react-redux';

const App = () => {
  const token = useSelector((store) => store.LoginData.token);
  

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<UserDashboard />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/payment" element={<AddFunds />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
