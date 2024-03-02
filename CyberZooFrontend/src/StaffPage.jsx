import React, { useState, useEffect } from 'react';

const StaffPage = ({ staffId }) => {
  const [animals, setAnimals] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        // Fetch animals assigned to the staff member
        const animalsResponse = await fetch(`http://127.0.0.1:8000/api/staff/${staffId}/animals`);
        if (!animalsResponse.ok) {
          throw new Error('Failed to fetch responsible animals');
        }
        const animalsData = await animalsResponse.json();
        setAnimals(animalsData);

        // Fetch daily tasks of the staff member
        const tasksResponse = await fetch(`http://127.0.0.1:8000/api/staff/${staffId}/tasks`);
        if (!tasksResponse.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const tasksData = await tasksResponse.json();
        setTasks(tasksData);
      } catch (error) {
        console.error('Error fetching staff data:', error);
      }
    };

    fetchStaffData();
  }, [staffId]);

  return (
    <div>
      <h2>Animals I'm Responsible For</h2>
      <ul>
        {animals.map(animal => (
          <li key={animal.id}>{animal.name}</li>
        ))}
      </ul>

      <h2>My Daily Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default StaffPage;
