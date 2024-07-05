import { useState } from "react";
import { useAuth } from "../hooks/useAuth.jsx";

export const Login = () => {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (gmail === "miranda@gmail.com" && password === "mirapass") {
      await login({ gmail });
      setError(""); 
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="gmail">gmail:</label>
          <input
            id="email"
            type="text"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
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
        {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
