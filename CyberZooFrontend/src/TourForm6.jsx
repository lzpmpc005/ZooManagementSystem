
import React, { useState, useEffect } from 'react';
import { FormWrapper } from "./FormWrapper";


export function TourForm6({habitat4_id, leave_time4, updateFields }) {
    const [habitats, setHabitats] = useState([]);
    const [selectedHabitat, setSelectedHabitat] = useState('');
    const [leaveTime, setLeaveTime] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    
    useEffect(() => {
        fetchHabitats();
    }, []);

    const fetchHabitats = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/get_next_habitats/' + habitat4_id + '/' + leave_time4 + '/');
            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message);
                console.log(errorMessage);
                return;
            }
            const data = await response.json();
            setHabitats(data);
            if (data.length > 0) {
                setSelectedHabitat(String(data[0].id) );
                updateFields({ habitat5_id: String(data[0].id) });
            }
        } catch (error) {
            console.error('Error fetching habitats:', error);
        }
    };

    const handleHabitatChange = (event) => {
        setSelectedHabitat(event.target.value);
        updateFields({ habitat5_id: event.target.value });
    };

    const handleLeaveTimeChange = (event) => {
        setLeaveTime(event.target.value);
        updateFields({ leave_time5: event.target.value });
    };

    return (
        <FormWrapper title="Choose Habitat 5">
            {errorMessage ? (
                <div className="error">{errorMessage}</div>
            ) : (
                <>
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
                </>
            )}
        </FormWrapper>
    );
}