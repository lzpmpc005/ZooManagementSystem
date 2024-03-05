import React, { useState, useEffect } from 'react';
import './HabitatsComponent.css'; 


const AnimalsComponent = () => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {

    const fetchAnimals = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/animals/');
        if (!response.ok) {
          throw new Error('Failed to fetch animals');
        }
        const data = await response.json();
        setHabitats(data);
      } catch (error) {
        console.error('Error fetching animals:', error);
      }
    };

    fetchAnimals(); 
  }, []);

  return (
    <div className="animals">
      <h2>Check All Our Animals!</h2>
      <div className="animal-list">
        {animals.map(animal => (
          <div key={animal.id} className="animal-card">
            <h3>{animal.name}</h3>
            <img src={animal.image_url} alt={animal.species} />
            <p>{animal.behavior}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
   
export default AnimalsComponent;