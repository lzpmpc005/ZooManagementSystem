import { useState } from "react";
import { FormWrapper } from "./FormWrapper";


export function TourForm1({ initialName, initialDescription, start_time, updateFields }) {
    const [startTime, setStartTime] = useState(start_time);
    const [name, setName] = useState(initialName);
    const [description, setDescription] = useState(initialDescription);

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