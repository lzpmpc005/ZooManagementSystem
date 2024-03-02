import React from 'react';

const LoginComponent = () => {
  const handleLogin = () => {
    // Redirect the user to the login page
    window.location.href = '/login';
  };

  return (
    <div>
      <h2>Login</h2>
      {/* Use a button with an onClick event handler to navigate to the login page */}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginComponent;
