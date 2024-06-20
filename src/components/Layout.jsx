import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
export const Layout = () => {
const { logout } = useAuth();
  return (
    <div>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/bookings">Bookings</Link>
        <Link to="/reviews">Reviews</Link>
        <Link to="/rooms">Rooms</Link>
        <Link to="/employees">Employees</Link>
        <div onClick={logout}>Logout</div>
      </nav>
      <Outlet />
    </div>
  );
};
