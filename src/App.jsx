import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Bookings from './components/Bookings';
import BookingDetails from './components/BookingDetails';
import Reviews from './components/Reviews';
import Rooms from './components/Rooms';
import Employees from './components/Employees';
import Login from './components/Login';
import Signup from './components/Signup';
import Layout from './components/Layout';

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth === 'true') {
      setAuth(true);
    }
  }, []);

  const handleLogin = () => {
    setAuth(true);
    localStorage.setItem('auth', 'true');
  };

  const handleLogout = () => {
    setAuth(false);
    localStorage.removeItem('auth');
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setAuth={handleLogin} />} />
        <Route path="/signup" element={<Signup setAuth={handleLogin} />} />
        {auth ? (
          <Route element={<Layout handleLogout={handleLogout} />}>
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/bookings/:id" element={<BookingDetails />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/employees" element={<Employees />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
