import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = ({ setAuth }) => {
  const [credentials, setCredentials] = useState({ username: 'admin', password: '1234' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuth();
    localStorage.setItem('auth', 'true'); 
    navigate('/bookings');
  };

  return (
    <div>
      <h1>Login</h1>
      <p>admin | 1234</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
