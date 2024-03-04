
import React, { useState, useEffect } from 'react';

const HabitatsComponent = () => {
  const [habitats, setHabitats] = useState([]);

  useEffect(() => {

    const fetchHabitats = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/habitats/');
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
  }, []);

  return (
    <div>
      <h2>Welcome to the CyberZoo!</h2>
      <ul>
        {habitats.map(habitat => (
          <li key={habitat.id}>
            <h3>{habitat.name}</h3>
            <p>{habitat.description}</p>
            <img src={habitat.image_url} alt={habitat.name} style={{ maxWidth: '300px' }} />
          </li>
        ))}
      </ul>
    </div>
  );
};
   
export default HabitatsComponent;
