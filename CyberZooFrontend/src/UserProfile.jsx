import React, { useEffect, useState } from 'react';

const UserProfile = ({ customerId }) => {
    const [user, setUser] = useState(null);
    console.log(customerId);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log(customerId);
                const response = await fetch(`http://127.0.0.1:8000/api/get_customer/${customerId}`);
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [customerId]);

    return (
        <div className="user-profile">
            {user ? (
                <section style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '1.5em', marginBottom: '10px' }}>{user.membership.tier}    {user.user.username}</h2>
                    <p style={{ marginBottom: '5px' }}>Email: {user.user.email}</p>
                    <p style={{ marginBottom: '5px' }}>Age: {user.age}</p>
                    <p style={{ marginBottom: '5px' }}>Membership: {user.membership.tier}</p>
                    <h3 style={{ marginTop: '20px', fontSize: '1.2em' }}>Privilege</h3>
                    <p style={{ marginBottom: '5px' }}>Discount: {user.membership.discount * 100}%</p>
                    <p style={{ marginBottom: '5px' }}>Free Parking: {user.membership.free_parking ? 'Yes' : 'No'}</p>
                    <p style={{ marginBottom: '5px' }}>Special Events: {user.membership.special_events ? 'Yes' : 'No'}</p>
                </section>
            ) : (
                <p className="loading">Loading user information...</p>
            )}
        </div>

    );
};

export default UserProfile;
