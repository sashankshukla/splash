import Navbar from './components/Navbar/Navbar';
import UserDashboard from './components/UserDashboard/UserDashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/profile" element={<UserDashboard />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
