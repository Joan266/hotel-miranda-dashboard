import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth, AuthContextType } from '../hooks/useAuth'; 
import styled from 'styled-components';
import React from 'react';

interface NavLinkProps {
  $active: string;
}

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100%;
`;

const NavContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  padding: 3em 0;
  height: 100%;
  width: 350px;
  min-width: 250px;
  box-sizing: border-box;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  width: 100%;
`;

const NavLink = styled(Link)<NavLinkProps>`
  text-decoration: none;
  color: ${(props) => (props.$active === "true" ? props.theme.colors.primaryRed : props.theme.colors.gray)};
  padding: 1em 0;
  font-size: 0.8rem;
  border-left: 4px solid ${(props) => (props.$active === "true" ? props.theme.colors.primaryRed : "transparent")};
  width: 100%;
  padding-left: 3em;
  font-weight: ${(props) => (props.$active === "true" ? "bold" : "500")}; 
  &:hover {
    color: ${(props) => props.theme.colors.primaryRed};
    border-left: 4px solid ${(props) => props.theme.colors.primaryRed};
    font-weight: bold;
  }
`;

const LogoutButton = styled.div`
  cursor: pointer;
  padding: 0.5em 1em;
  font-size: 0.85rem;
  margin-left: 3em;
  margin-top: 5em;
  background-color: ${(props) => props.theme.colors.primaryRed};
  color: ${(props) => props.theme.colors.white};
  border-radius: 0.4em;
  &:hover {
    background-color: ${(props) => props.theme.colors.black};
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  min-height: 100%;
  position: relative;
  background-color: ${(props) => props.theme.colors.lightGray};
`;

const Header = styled.header`
  padding: 0 0.5em;
  height: 5em;
  display: flex;
  align-items: center;
  background-color: #FFFFFF;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 1.15rem;
  margin-left: 1.5em;
`;

export const Layout: React.FC = () => {
  const { logout } = useAuth() as AuthContextType; 
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
          <NavLink to="/employees" $active={location.pathname.includes('/employees').toString()}>
            Employees
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
