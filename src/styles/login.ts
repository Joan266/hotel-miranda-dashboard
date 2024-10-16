
import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";

export const LoginContent = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  height: 100vh; 
`;

export const HeaderImage = styled.img`
  height: 100vh;
  width: 50%;
  object-fit: cover;
  object-position: bottom;
`;

export const LoginContainer = styled.div`
  width: 50%;
`;

export const UserIcon = styled(FaUserCircle)`
  font-size: 50px;
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  background-color: white;
  color: #3b3b3b;
  width: 300px;
  padding: 0.5rem;
  border: 2px solid #188669;
  border-radius: 0.5rem;
  z-index: 1;
  display: block;
  margin: 1rem auto 2rem auto;
`;

export const Button = styled.button`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: white;
  color: #3b3b3b;
  cursor: pointer;
  box-shadow: 1px 1px 2px black;
  transition: border-color 0.25s;

  &:hover {
    filter: brightness(90%);
  }

  &:focus,
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;
