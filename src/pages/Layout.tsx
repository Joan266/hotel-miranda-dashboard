import { Outlet, useLocation } from 'react-router-dom';
import React from 'react';
import { AuthStatus } from '../components/AuthStatus';
import { HeaderNav } from '../components/HeaderNav';
import { LayoutContainer, NavContainer, Nav, NavLink, ContentContainer, ImageLogo } from '../styles/layout';
import travl from "../assets/img/vista.png";

export const Layout: React.FC = () => {
  const location = useLocation();

  return (
    <LayoutContainer>
      <NavContainer>
        <ImageLogo><img src={travl} alt="imagen del logotipo" /><h1>Hotel Miranda</h1></ImageLogo>
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
          <AuthStatus></AuthStatus>
        </Nav>
      </NavContainer>
      <ContentContainer>
        <HeaderNav/>
        <Outlet />
      </ContentContainer>
    </LayoutContainer>
  );
};

