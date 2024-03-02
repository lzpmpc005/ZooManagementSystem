import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [habitats, setHabitats] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchHabitats = async () => {
      try {
        // Replace 'your-authentication-token' with the actual authentication token
        const response = await fetch('http://127.0.0.1:8000/api/habitats/', {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch habitats');
        }
        const data = await response.json();
        setHabitats(data);
      } catch (error) {
        console.error('Error fetching habitats:', error);
      }
    };

    fetchHabitats();
  }, [token]); // Fetch habitats whenever the token changes

  return (
    <div>
      <h1>Welcome to the Zoo!</h1>
      <h2>Habitats</h2>
      <ul>
        {habitats.map(habitat => (
          <li key={habitat.id}>
            <h3>{habitat.name}</h3>
            <p>{habitat.description}</p>
            {/* Link to staff page for each habitat */}
            <Link to={`/staff/${habitat.manager.id}`}>Mine</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
