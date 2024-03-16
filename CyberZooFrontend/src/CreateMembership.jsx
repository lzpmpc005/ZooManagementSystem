import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateMembership = ({ setMemberships }) => {
    const navigate = useNavigate(); 
    const [formFields, setFormFields] = useState({
        tier: '',
        price: '',
        discount: '',
        freeParking: false,
        specialEvents: false
    });

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const fieldValue = type === 'checkbox' ? checked : value;

        setFormFields(prevState => ({
            ...prevState,
            [name]: fieldValue
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://127.0.0.1:8000/api/create_membership/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formFields),
        })
        .then(response => response.json())
        .then(data => {
            setMemberships(prevMemberships => [...prevMemberships, data]);
            navigate('/membership');
        })
        .catch(error => console.log(error));
    };

    const formFieldsConfig = [
        { name: 'tier', type: 'select', label: 'Select a tier', options: ['Explorer', 'Protector', 'Guardian', 'Champion'] },
        { name: 'price', type: 'number', label: 'Price' },
        { name: 'discount', type: 'number', label: 'Discount' },
        { name: 'freeParking', type: 'checkbox', label: 'Free Parking' },
        { name: 'specialEvents', type: 'checkbox', label: 'Special Events' }
    ];

    return (
        <form onSubmit={handleSubmit}>
            {formFieldsConfig.map(field => (
                <div key={field.name}>
                    {field.type === 'select' ? (
                        <select
                            name={field.name}
                            value={formFields[field.name]}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">{field.label}</option>
                            {field.options.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type={field.type}
                            name={field.name}
                            value={formFields[field.name]}
                            onChange={handleInputChange}
                            checked={formFields[field.name]}
                        />
                    )}
                    <label>{field.label}</label>
                </div>
            ))}
            <button type="submit">Create Membership</button>
        </form>
    );
};

export default CreateMembership;
