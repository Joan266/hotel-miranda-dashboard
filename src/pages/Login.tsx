import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import hotel from "../assets/img/hotel-dashboard-header2.jpeg";

export const Login = () => {
  const [email, setEmail] = useState<string>("admin@example.com");
  const [password, setPassword] = useState<string>("securepassword?5A!@");

  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <LoginContent>
      <HeaderImage src={hotel} alt="header image" />
      <LoginContainer>
        <UserIcon />
        <div>
          <p>You are not logged in</p>
        </div>
        <form onSubmit={handleLogin}>
          <Input
            type="text"
            placeholder="Insert email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Insert password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
        </form>
      </LoginContainer>
    </LoginContent>
  );
};

const LoginContent = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  height: 100vh; 
`;

const HeaderImage = styled.img`
  height: 100vh;
  width: 50%;
  object-fit: cover;
  object-position: bottom;
`;

const LoginContainer = styled.div`
  width: 50%;
`;

const UserIcon = styled(FaUserCircle)`
  font-size: 50px;
  margin-bottom: 1rem;
`;

const Input = styled.input`
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

const Button = styled.button`
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

const ErrorMessage = styled.p`
  color: red;
`;

export default Login;
