import styled from 'styled-components';
import { NavLinkProps } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const LayoutContainer = styled.div`
  display: flex;
  min-height: 100%;
`;
export const NavContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  padding: 0.5em 0;
  min-height: 100%;
  width: 300px;
  min-width: 300px;
  box-sizing: border-box; 
  position: relative; 

  // &::after {
  //   content: "";
  //   position: absolute;
  //   right: 0; 
  //   top: 0;
  //   bottom: 0;
  //   width: 1px;
  //   background-color: ${(props) => props.theme.colors.gray};
  // }
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  width: 100%;
`;

export const NavLink = styled(Link) <NavLinkProps>`
  text-decoration: none;
  color: ${(props) => (props.$active === "true" ? props.theme.colors.primaryRed : props.theme.colors.gray)};
  padding: 1em 0;
  font-size: 1rem;
  border-left: 8px solid ${(props) => (props.$active === "true" ? props.theme.colors.primaryRed : "transparent")};
  width: 100%;
  padding-left: 3em;
  background-color:${(props) => (props.$active === "true" ? "rgba(255, 0, 0, 0.02)" : "transparent")};
  font-weight: ${(props) => (props.$active === "true" ? "bold" : "500")}; 
  z-index:2;
  &:hover {
    color: ${(props) => props.theme.colors.primaryRed};
    border-left: 8px solid ${(props) => props.theme.colors.primaryRed};
    background-color:rgba(255, 0, 0, 0.02);
  }
`;



export const ContentContainer = styled.div`
  width: 100%;
  min-height: 100%;
  position: relative;
  background-color: ${(props) => props.theme.colors.lightGray};
`;


export const ImageLogo = styled.div`
    display: flex;
    align-items: center;
    flex-direction:column;
    margin-bottom:2em;
    >img {
      width: 140px;
    }  
    h1 {
      font-size: 1.5rem; 
      color: ${(props) => props.theme.colors.primaryRed};
      margin: 0;
    }
`