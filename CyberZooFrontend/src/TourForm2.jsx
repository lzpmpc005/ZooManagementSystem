
import React, { useState, useEffect } from 'react';
import { FormWrapper } from "./FormWrapper";


export function TourForm2({id, start_time, updateFields }) {
    const [habitats, setHabitats] = useState([]);
    const [selectedHabitat, setSelectedHabitat] = useState('');
    const [leaveTime, setLeaveTime] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    
    useEffect(() => {
        fetchHabitats();
    }, []);

    const fetchHabitats = async () => {
        try {
            const response = await fetch(
                'http://127.0.0.1:8000/api/get_next_habitats/' 
                + id + '/' + start_time + '/', {
                credentials: 'include',
              });
            console.log(document.cookie);
            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message);
                return;
            }
            const data = await response.json();
            setHabitats(data);
            if (data.length > 0) {
                setSelectedHabitat(String(data[0].id) );
                updateFields({ habitat1_id: String(data[0].id)  });
            }
        } catch (error) {
            console.error('Error fetching habitats:', error);
            setErrorMessage('An unexpected error occurred.');
        }
    };

    const handleHabitatChange = (event) => {
        setSelectedHabitat(event.target.value);
        updateFields({ habitat1_id: event.target.value });
    };

    const handleLeaveTimeChange = (event) => {
        setLeaveTime(event.target.value);
        updateFields({ leave_time1: event.target.value });
    };

    return (
        <FormWrapper title="Choose Habitat 1">
            <div>
                <label>Habitat</label>
                <select required name="habitat_id" value={selectedHabitat} onChange={handleHabitatChange}>
                    {habitats.map((habitat) => (
                        <option key={habitat.id} value={habitat.id}>
                            {habitat.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Leave Time</label>
                <input required type="time" name="leave_time" value={leaveTime} onChange={handleLeaveTimeChange} />
            </div>
        </FormWrapper>
    );
}
