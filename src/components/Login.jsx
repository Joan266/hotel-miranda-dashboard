import { useState } from "react";
import { useAuth } from "../hooks/useAuth.jsx";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (username === "admin" && password === "1234") {
      await login({ username });
    } else {
      alert("Invalid username or password");
    }
  };
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};