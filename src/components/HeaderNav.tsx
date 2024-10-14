import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Define a type for route titles mapping
type RouteTitles = {
  [key: string]: string;
};

const HeaderNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // State to manage the title and whether it's a secondary route
  const [title, setTitle] = useState<string>('Dashboard');
  const [isSecondaryRoute, setIsSecondaryRoute] = useState<boolean>(false);

  // A map of routes to titles (can be expanded)
  const routeTitles: RouteTitles = {
    '/': 'Dashboard',
    '/reviews': 'Reviews',
    '/bookings': 'Bookings',
    '/rooms': 'Rooms',
    '/users': 'Users',
  };

  // Determine if the current route is primary or secondary based on location
  useEffect(() => {
    const path = location.pathname;

    // Check if the current route is one of the primary routes
    if (routeTitles[path]) {
      setIsSecondaryRoute(false);
      setTitle(routeTitles[path] || 'Dashboard');
    } else {
      // If not, assume it's a secondary route (e.g., /rooms/create)
      setIsSecondaryRoute(true);
      const baseRoute = `/${path.split('/')[1]}`; // Get the base route
      setTitle(routeTitles[baseRoute] || 'Dashboard');
    }
  }, [location]);

  // Back Navigation Handler
  const handleBack = () => {
    navigate(-1); // Navigate back to the previous route
  };

  return (
    <header>
      <div>
        {isSecondaryRoute && (
          <button onClick={handleBack}>Back</button> {/* Show Back button for secondary routes */}
        )}
        <h1>{title}</h1> {/* Show dynamic route title */}
      </div>
    </header>
  );
};

export default HeaderNav;
