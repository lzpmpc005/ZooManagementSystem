import React, { useState, useEffect } from 'react';
import './RoutineComponent.css'; 


const StaffAssignedTasksComponent = ({ pk }) => {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {

    const fetchRoutines = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/staff/${pk}/routines`);
        if (!response.ok) {
          throw new Error('Failed to fetch routines');
        }
        const data = await response.json();
        console.log('Routines:', data);
        setRoutines(data);
      } catch (error) {
        console.error('Error fetching routines:', error);
      }
    };

    fetchRoutines(); 
  }, [pk]);

  return (
    <div className="routines">
        <h3>Routines of Animals Assigned To You</h3>
        <div className="routine-list">
            <table className="routine-table">
                <thead>
                    <tr>
                        <th>Animal ID</th>
                        <th>Feeding Time</th>
                        <th>Diet Plan</th>
                        <th>Training Time</th>
                        <th>Cleaning Time</th>
                        <th>Exam Date</th>
                        <th>Exam Time</th>
                    </tr>
                </thead>
                <tbody>
                    {routines.map(routine => (
                    <tr key={routine.animal}>
                        <td>{routine.animal}</td>
                        <td>{routine.feeding_time}</td>
                        <td>{routine.diet_plan}</td>
                        <td>{routine.training_time}</td>
                        <td>{routine.cleaning_time}</td>
                        <td>{routine.examination_date}</td>
                        <td>{routine.examination_time}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};
   
export default StaffAssignedTasksComponent;