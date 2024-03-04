import React, { useState, useEffect } from 'react';
import './AnimalComponent.css'; 


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
        setAnimals(data);
      } catch (error) {
        console.error('Error fetching animals:', error);
      }
    };

    fetchAnimals(); 
  }, []);

  return (
    <div className="animals">
      <h3>Check All Our Animals!</h3>
      <div className="animal-list">
        {animals.map(animal => (
          <div key={animal.id} className="animal-card">
            <h5>{animal.species}</h5>
            <img src={animal.image_url} alt={animal.species} />
            <p>{animal.behavior}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
   
export default AnimalsComponent;