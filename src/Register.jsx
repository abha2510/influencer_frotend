import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Login from './Login';

function Register({ setUsername: setParentUsername }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://tasty-gown-lion.cyclic.app/register', { username, password ,email});
      navigate('/login');
      alert('User registered successfully.')
      setParentUsername(username); 
      localStorage.setItem("username", username);

    } catch (e) {
      alert('Username already exists');
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        />
       <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        />
      <button type="submit">Register</button>
    </form>
    
    </>
  );
}

export default Register;
