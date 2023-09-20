import React, { useState } from 'react';
import axios from 'axios';
import '../Css/Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:3001/users', {
        params: {
          username,
          password,
        },
      });
      if (response.data.length === 1) {
        // Successful login
        setLoginError(false);
        navigate("/")
        // Redirect or perform other actions as needed
      } else {
        // Incorrect credentials
        setLoginError(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleclick = ()=>{
    navigate("/")
  }
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">Log In</button>
      </form>
      {loginError && (
        <div className="error-message">
          <p>Incorrect username or password. Please try again.</p>
        </div>
      )}

{!loginError && (
        <div className="modal">
          <div className="modal-content">
            <p>Login successful! You are logged in.</p>
            <button onClick={handleclick}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
