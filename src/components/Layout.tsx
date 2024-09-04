import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; 
import styled from 'styled-components';
import React from 'react';




export const Layout: React.FC = () => {
  const { logout } = useAuth(); 
  const location = useLocation();

  const getPageName = (pathname: string): string => {
    if (pathname === '/') {
      return 'Dashboard';
    }
    const pageName = pathname.replace('/', '');
    return pageName.charAt(0).toUpperCase() + pageName.slice(1);
  };

  const pageName = getPageName(location.pathname);

  return (
    <LayoutContainer>
      <NavContainer>
        <Nav>
          <NavLink to="/" $active={location.pathname.endsWith('/').toString()}>
            Dashboard
          </NavLink>
          <NavLink to="/bookings" $active={location.pathname.includes('/bookings').toString()}>
            Bookings
          </NavLink>
          <NavLink to="/reviews" $active={location.pathname.includes('/reviews').toString()}>
            Reviews
          </NavLink>
          <NavLink to="/rooms" $active={location.pathname.includes('/rooms').toString()}>
            Rooms
          </NavLink>
          <NavLink to="/users" $active={location.pathname.includes('/users').toString()}>
            Users
          </NavLink>
          <LogoutButton onClick={logout}>Logout</LogoutButton>
        </Nav>
      </NavContainer>
      <ContentContainer>
        <Header><Title>{pageName}</Title></Header>
        <Outlet />
      </ContentContainer>
    </LayoutContainer>
  );
};
