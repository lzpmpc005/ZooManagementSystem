
import React from 'react';
import Habitats from './Habitats';
import './index.css';
import Login from './Login'

const App = () => {
  const handleLogin = () => {
    console.log('Login clicked');
  };


  return (
    
    <div>
      <h1>CyberZoo</h1>
      <Login />
      <Habitats />
    </div>
  );
};

export default App;
