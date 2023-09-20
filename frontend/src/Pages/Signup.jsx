import React, { useState } from 'react';
import axios from 'axios';
import '../Css/Signup.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate()
  const handleSignup = async (e) => {

    
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/users', {
        username,
        password,
      });
      setSignupSuccess(true);
      setUsername('');
      setPassword('');
      navigate("/login")
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
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
        
        <button type="submit">Sign Up</button>
      </form>
      {signupSuccess && (
        <div className="modal">
          <div className="modal-content">
            <p>Signup successful! You can now log in.</p>
            <button onClick={() => setSignupSuccess(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
