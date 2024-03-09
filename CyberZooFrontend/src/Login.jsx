import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/'
});

// const cookies = new Cookies();

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const ifResponseOk = (response) => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  function login(event) {
    event.preventDefault();
    client.post('login/', {
      username: username,
      password: password
    })
    .then((response) => {
      console.log(response.data);
      setUsername('');
      setPassword('');
      setError('');
      onLogin(response.data.username, response.data.id);
      navigate('/home');
    })
    .catch((error) => {
      console.log(error);
      setError('Invalid username or password');
    });
  }

  return (
    <div className="container mt-3">
      <form onSubmit={login}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" className="form-control" 
            id="username" value={username} 
            onChange={handleUsernameChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            name="password" 
            value={password} 
            onChange={handlePasswordChange} />
          <div>
            {error && <small className='text-danger'>{error}</small>}
          </div>
        </div> 
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;
