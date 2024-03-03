import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StaffAnimalsComponent = ({ pk }) => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/staff/${pk}/animals`);
        setAnimals(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [pk]); // Fetch data when pk changes

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Animals of Staff with ID: {pk}</h2>
      <ul>
        {animals.map(animal => (
          <li key={animal.id}>
            <strong>Name:</strong> {animal.name}, <strong>Species:</strong> {animal.species}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StaffAnimalsComponent;
