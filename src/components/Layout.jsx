import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100%;
`;

const NavContainer = styled.div`
  background-color: ${props => props.theme.colors.white};
  padding: 3em 0;
  height: 100%;
  width:350px;
  min-width:250px;
  box-sizing: border-box;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  width: 100%;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.colors.gray};
  padding: 1em 0;
  font-size: 0.8rem;
  border-left: 4px solid transparent;
  width:100%;
  padding-left:3em;
  font-weight:500;
  &:hover {
    color: ${props => props.theme.colors.primaryRed};
    border-left: 4px solid ${props => props.theme.colors.primaryRed};
    font-weight: bold;
  }
  &.active {
    color: ${props => props.theme.colors.primaryRed};
    font-weight: bold;
    border-left: 4px solid ${props => props.theme.colors.primaryRed};
  }
`;

const LogoutButton = styled.div`
  cursor: pointer;
  padding: 0.5em 1em;
  font-size: 0.85rem;
  margin-left: 3em;
  margin-top:5em;
  background-color: ${props => props.theme.colors.primaryRed};
  color: ${props => props.theme.colors.white};
  border-radius: 0.4em;
  &:hover {
    background-color: ${props => props.theme.colors.black};
  }
`;

const ContentContainer = styled.div`
  width:100%;
  min-height: 100%;
  position:relative;
  background-color: ${props => props.theme.colors.lightGray};
`;

const Header = styled.header`
  padding: 1.2em 0.5em;
  background-color: #FFFFFF;
`;
const Title = styled.h1`
  font-weight:600;
  font-size: 1.15rem;
  margin-left:1.5em;
`;

export const Layout = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const getPageName = (pathname) => {
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
          <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
            Dashboard
          </NavLink>
          <NavLink to="/bookings" className={location.pathname.includes('/bookings') ? 'active' : ''}>
            Bookings
          </NavLink>
          <NavLink to="/reviews" className={location.pathname.includes('/reviews') ? 'active' : ''}>
            Reviews
          </NavLink>
          <NavLink to="/rooms" className={location.pathname.includes('/rooms') ? 'active' : ''}>
            Rooms
          </NavLink>
          <NavLink to="/employees" className={location.pathname.includes('/employees') ? 'active' : ''}>
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
