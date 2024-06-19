import { Outlet, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Layout = ({ handleLogout }) => {
  const navigate = useNavigate();

  return (
    <div>
        <h1>My Application</h1>
      <nav>
        <Link onClick={() => navigate('/bookings')}>Bookings</Link>
        <Link onClick={() => navigate('/contact')}>Contact</Link>
        <Link onClick={() => navigate('/rooms')}>Rooms</Link>
        <Link onClick={() => navigate('/users')}>Users</Link>
        <Link onClick={handleLogout}>Logout</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
