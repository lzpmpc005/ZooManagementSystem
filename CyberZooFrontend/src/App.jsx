import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import React from 'react';
import HomePage from './HomePage.jsx';
import Animals from './Animals.jsx';
import Login from './Login.jsx';
import StaffAssignedAnimals from './StaffAssignedAnimals.jsx';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/'
});

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loggedInUserPk, setLoggedInUserPk] = useState(null);
  
  const handleLogin = (username, pk) => {
    localStorage.setItem('loggedInUser', username);
    localStorage.setItem('loggedInUserPk', pk);
    setLoggedInUser(username);
    setLoggedInUserPk(pk);
  }

  // function handleLogout(event) {
  //   event.preventDefault();
  //   client.post('logout/', {
  //     withCredentials: true,
  //   })
  //   .then(response => {
  //     if (response.status === 200) {
  //       localStorage.removeItem('loggedInUser');
  //       setLoggedInUser(null);
  //     } else {
  //       throw new Error('Failed to logout');
  //     }
  //   })
  //   .catch(error => console.error(error));
  // };

  function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('loggedInUserPk');
    setLoggedInUser(null);
    setLoggedInUserPk(null);
  };

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    const pk = localStorage.getItem('loggedInUserPk');
    if (user && pk) {
      setLoggedInUser(user);
      setLoggedInUserPk(pk);
    }
  }, []);
  
  return (
    <Router>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">CyberZoo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/animals">Animals</Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              {loggedInUser ? (
                <NavDropdown title={`Welcome, ${loggedInUser}`} id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="/assigned-animals">Assigned Animals</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Daily Tasks
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Report</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
                ) : (
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              )}              
            </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/animals" element={<Animals />} />
        <Route path="/assigned-animals" element={<StaffAssignedAnimals pk={loggedInUserPk} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;