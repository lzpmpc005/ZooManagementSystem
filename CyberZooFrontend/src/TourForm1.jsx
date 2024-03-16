import React, { useState, useEffect } from 'react';
import { FormWrapper } from "./FormWrapper";


export function TourForm1({ initialName, initialDescription, start_time, updateFields }) {
    const [startTime, setStartTime] = useState(start_time);
    const [name, setName] = useState(initialName);
    const [description, setDescription] = useState(initialDescription);
    const [guides, setGuides] = useState([]);
    const [selectedGuide, setSelectedGuide] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        fetchGuides();
    }, []);

    const fetchGuides = async () => {
        try {
            const response = await fetch(
                'http://127.0.0.1:8000/api/get_guides/', {
                credentials: 'include',
              });
            console.log(document.cookie);
            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message);
                return;
            }
            const data = await response.json();
            setGuides(data);
            if (data.length > 0) {
                setSelectedGuide(String(data[0].id) );
                updateFields({ guide_id: String(data[0].id)  });
            }
        } catch (error) {
            console.error('Error fetching guides:', error);
            setErrorMessage('An unexpected error occurred.');
        }
    };

    const handleGuideChange = (event) => {
        setSelectedGuide(event.target.value);
        updateFields({ guide_id: event.target.value });
    };


    const handleStartTimeChange = (event) => {
        setStartTime(event.target.value);
        updateFields({ start_time: event.target.value });
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
        updateFields({ name: event.target.value });
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
        updateFields({ description: event.target.value });
    }

    return (
        <FormWrapper title="Create New Tour">
            <div>
                <label>Tour Guide</label>
                <select required name="guide_id" value={selectedGuide} onChange={handleGuideChange}>
                    {guides.map((guide) => (
                        <option key={guide.id} value={guide.id}>
                            {guide.user.username}
                        </option>
                    ))}
                </select>
                <label>Tour Name</label>
                <input
                    autoFocus
                    required
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                />
                <label>Description</label>
                <input
                    autoFocus
                    required
                    type="text"
                    name="description"
                    value={description}
                    onChange={handleDescriptionChange}
                />
                <label>Start Time</label>
                <input
                    autoFocus
                    required
                    type="time"
                    name="start_time"
                    value={startTime}
                    onChange={handleStartTimeChange}
                />
            </div>
        </FormWrapper>
    );
}