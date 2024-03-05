import React, { useState, useEffect } from 'react';
import './HabitatsComponent.css'; 


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
    <div className="habitats">
      <h2>Welcome To CyberZoo! Have A Good Time!</h2>
      <div className="habitat-list">
        {habitats.map(habitat => (
          <div key={habitat.id} className="habitat-card">
            <h3>{habitat.name}</h3>
            <img src={habitat.image_url} alt={habitat.name} />
            <p>{habitat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
   
export default HabitatsComponent;