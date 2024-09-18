import styled from 'styled-components';
import { NavLinkProps } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const LayoutContainer = styled.div`
  display: flex;
  min-height: 100%;
`;

export const NavContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  padding: 3em 0;
  height: 100%;
  width: 350px;
  min-width: 250px;
  box-sizing: border-box;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  width: 100%;
`;

export const NavLink = styled(Link)<NavLinkProps>`
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

export const LogoutButton = styled.div`
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

export const ContentContainer = styled.div`
  width: 100%;
  min-height: 100%;
  position: relative;
  background-color: ${(props) => props.theme.colors.lightGray};
`;

export const Header = styled.header`
  padding: 0 0.5em;
  height: 5em;
  display: flex;
  align-items: center;
  background-color: #FFFFFF;
`;

export const Title = styled.h1`
  font-weight: 600;
  font-size: 1.15rem;
  margin-left: 1.5em;
`;
