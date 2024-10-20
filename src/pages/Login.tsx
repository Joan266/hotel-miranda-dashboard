import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import hotel from "../assets/img/hotel-dashboard-header2.jpeg";
import { Button, Input, UserIcon, LoginContainer, HeaderImage, LoginContent } from "../styles/login";
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

export default Login;