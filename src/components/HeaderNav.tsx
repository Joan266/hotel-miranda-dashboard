import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Header, Title, BackButton } from '../styles/headernav';

type RouteTitles = {
  [key: string]: string;
};

const routeTitles: RouteTitles = {
  '/': 'Dashboard',
  '/reviews': 'Reviews',
  '/bookings': 'Bookings',
  '/rooms': 'Rooms',
  '/users': 'Users',
};

const getBaseRouteTitle = (pathSegments: string[]): string => {
  const baseRoute = `/${pathSegments[0]}`;
  return routeTitles[baseRoute] || 'Dashboard';
};

const HeaderNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>('Dashboard');
  const [isSecondaryRoute, setIsSecondaryRoute] = useState<boolean>(false);

  useEffect(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    
    if (pathSegments.length === 0) {
      // Handle the root route "/"
      setTitle(routeTitles['/']);
      setIsSecondaryRoute(false);
      return;
    }

    const baseTitle = getBaseRouteTitle(pathSegments);

    if (pathSegments.length > 2) {
      const action = pathSegments[2];
      const id = pathSegments[1];
      const actionTitle = action === 'create' ? 'Create' : action === 'update' ? 'Update' : '';
      setTitle(`${baseTitle} > ${id} > ${actionTitle} `);
      setIsSecondaryRoute(true);
    } else if (pathSegments.length === 2) {
      const id = pathSegments[1];
      setTitle(`${baseTitle} > ${id} > View`);
      setIsSecondaryRoute(true);
    } else {
      setTitle(baseTitle);
      setIsSecondaryRoute(false);
    }
  }, [location]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Header>
      {isSecondaryRoute && (
        <BackButton onClick={handleBack}>
         <FontAwesomeIcon icon={faArrowLeft} /> 
        </BackButton>)
      }
      <Title>{title}</Title>
    </Header>
  );
};

export default HeaderNav;
