import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';

const Membership = ({ userRole, userAge, userMembership, customerId, updateUserMembership }) => {
    const [Message, setMessage] = useState('');

    const styles = {
        header: {
          padding: '16px',
          textAlign: 'center',
          borderBottom: '2px solid #ddd',
          backgroundColor: '#f2f2f2',
          fontSize: '1.2em', // Larger font size
        },
        cell: {
          padding: '16px',
          textAlign: 'center',
          borderBottom: '2px solid #ddd',
          fontSize: '1.1em', // Larger font size
        },
        button: {
            padding: '10px 20px',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1.1em',
            // Purple background for Join button
            backgroundColor: 'green',
        },

        cancelButton: {
            padding: '10px 20px',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1.1em',
            // Red background for Cancel button
            backgroundColor: 'red',
        },
    };

    const [modalTitle, setModalTitle] = useState('');
    const [submitButtonText, setSubmitButtonText] = useState('');
    const [membershipEndpoint, setMembershipEndpoint] = useState('');
    const [memberships, setMemberships] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formFields, setFormFields] = useState({
        id: null,
        tier: '',
        price: '',
        discount: '',
        free_parking: false,
        special_events: false
    });

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/get_memberships/')
            .then(response => response.json())
            .then(data => setMemberships(data))
            .catch(error => console.log(error));
    }, []);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setModalTitle('');
        setSubmitButtonText('');
        setMembershipEndpoint('');
        setFormFields({
            id: null,
            tier: '',
            price: '',
            discount: '',
            free_parking: false,
            special_events: false
        });
    };

    const handleUpdateMembership = (membership) => {
        setFormFields({ ...membership });
        setModalTitle("Update Membership");
        setMembershipEndpoint('update_membership/');
        setSubmitButtonText("Update");
        handleShowModal();
    };
    
    const handleCreateMembership = () => {
        setFormFields({
            id: null,
            tier: '',
            price: '',
            discount: '',
            free_parking: false,
            special_events: false
        });
        setModalTitle("Create Membership");
        setSubmitButtonText("Create");
        setMembershipEndpoint('create_membership/');
        handleShowModal();
    };
    

    const handleInputChange = event => {
        const { name, value, type, checked } = event.target;
        const fieldValue = type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value;
        setFormFields(prevState => ({
            ...prevState,
            [name]: fieldValue
        }));
    };

    const handleCreateOrUpdate = event => {
        event.preventDefault();
        console.log(JSON.stringify(formFields))
        const endpoint = formFields.id ? 'update_membership/' : 'create_membership/';

        fetch(`http://127.0.0.1:8000/api/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formFields),
        })
        .then(response => response.json())
        .then(data => {
            setMemberships(prevMemberships => {
                const updatedMemberships = prevMemberships.map(membership => {
                    return membership.id === data.id ? data : membership;
                });
                return updatedMemberships;
            });
            handleCloseModal();
            console.log(data.message)
            setMessage(data.message)
            window.alert(Message); 
        })
        .catch(error => {
            console.log(error);
            window.alert(error.error);
        });
    };

    
    const handleJoinMembership = (membership, customerId) => {
        if (membership.tier === "Explorer" && userAge > 16) {
            window.alert('You are not eligible to join the Explorer membership.');
            return;
        } else {
            console.log(
                "Joining membership:",
                customerId)
                
            fetch("http://127.0.0.1:8000/api/join_membership/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customerId: customerId,
                    tier: membership.tier
                }),
            })
            .then(response => response.json())
            .then(data => {
                updateUserMembership(membership.tier);
                setMemberships(prevMemberships => {
                    const updatedMemberships = prevMemberships.map(membership => {
                        return membership.id === data.id ? data : membership;
                    });
                    return updatedMemberships;
                });
                handleCloseModal(); 
                window.alert('Membership joined successfully!'); 
            })
            .catch(error => {
                console.log(error);
                window.alert(error.error);
            });
        } 
    };
     

    const handleChangeMembership = (membership, customerId) => {
        if (membership.tier === "Explorer" && userAge > 16) {
            window.alert('You are not eligible to join the Explorer membership.');
            return;
        } else {
            console.log(
                "Joining membership:",
                customerId)
                
            fetch("http://127.0.0.1:8000/api/change_membership/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customerId: customerId,
                    tier: membership.tier
                }),
            })
            .then(response => response.json())
            .then(data => {
                updateUserMembership(membership.tier);
                setMemberships(prevMemberships => {
                    const updatedMemberships = prevMemberships.map(membership => {
                        return membership.id === data.id ? data : membership;
                    });
                    return updatedMemberships;
                });
                handleCloseModal(); 
                window.alert('Membership switched successfully!'); 
            })
            .catch(error => {
                console.log(error);
                window.alert(error.error);
            });
        } 
    };

    const handleCancelMembership = (customerId) => {
        fetch("http://127.0.0.1:8000/api/change_membership/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customerId: customerId,
                tier: ''
            }),
        })
        .then(response => response.json())
        .then(data => {
            updateUserMembership("");
            setMemberships(prevMemberships => {
                const updatedMemberships = prevMemberships.map(membership => {
                    return membership.id === data.id ? data : membership;
                });
                return updatedMemberships;
            });
            handleCloseModal(); 
            window.alert('Membership cancled successfully!'); 
        })
        .catch(error => {
            console.log(error);
            window.alert(error.error);
        });
        };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div>
                <h1 style={{ 
                    marginBottom: '10px',
                    fontSize: '3.5em', // Larger font size
                    marginTop: '10px' 
                }}>
                    Membership List
                </h1>
                {userRole === "admin" && (
                    <button
                        style={{ 
                            padding: '15px 30px',
                            fontSize: '1.1em', // Larger font size
                            backgroundColor: '#007BFF', 
                            color: 'white', 
                            borderRadius: '6px', 
                            border: 'none',
                            marginBottom: '30px', 
                            marginTop: '20px',
                            cursor: 'pointer'
                        }}
                        onClick={handleCreateMembership}
                    >
                        Create Membership
                    </button>
                )}
                
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                    <tbody>
                        <tr>
                            <th style={styles.header}>Benefits</th>
                            {memberships.map(membership => (
                                <th key={membership.id} style={styles.header}>
                                    {membership.tier === "Explorer" ? (
                                        <span>
                                            Explorer <span style={{ fontSize: '0.9em' }}>(Under 17 Only)</span>
                                        </span>
                                    ) : (
                                        membership.tier
                                    )}
                                </th>
                            ))}
                        </tr>
                        <tr>
                        <td style={styles.cell}></td>
                            {memberships.map(membership => (
                                <td key={membership.id} style={styles.cell}>
                                    {userRole === "admin" ? (
                                        <button style={styles.button} onClick={() => handleUpdateMembership(membership)}>Update</button>
                                    ) : (
                                        !userMembership ? (
                                            <button style={styles.button} onClick={() => handleJoinMembership(membership, customerId)}>Join</button>
                                        ) : (
                                            membership.tier !== userMembership ? (
                                                <button style={styles.button} onClick={() => handleChangeMembership(membership, customerId)}>Switch</button>
                                            ) : <button style={styles.cancelButton} onClick={() => handleCancelMembership(customerId)}>Cancel</button>
                                        )
                                    )}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td style={styles.cell}>Price</td>
                            {memberships.map(membership => (
                                <td key={membership.id} style={styles.cell}>${parseFloat(membership.price).toFixed(2)}</td>
                            ))}
                        </tr>
                        <tr>
                            <td style={styles.cell}>Discount</td>
                            {memberships.map(membership => (
                                <td key={membership.id} style={styles.cell}>{membership.discount * 100}%</td>
                            ))}
                        </tr>
                        <tr>
                        <td style={styles.cell}>Free Parking</td>
                            {memberships.map(membership => (
                                <td key={membership.id} style={styles.cell}>
                                    {membership.free_parking ? <span style={{ color: 'green', fontSize: '3em', lineHeight: '0' }}>&#8226;</span> : null}
                                </td>
                            ))}

                        </tr>
                        <tr>
                            <td style={styles.cell}>Special Events</td>
                            {memberships.map(membership => (
                                <td key={membership.id} style={styles.cell}>
                                {membership.special_events ? <span style={{ color: 'green', fontSize: '3em', lineHeight: '0' }}>&#8226;</span> : null}
                            </td>
                            ))}
                        </tr>
                    </tbody>
                </table>

                <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleCreateOrUpdate}>
                            <div className="mb-3">
                                <label className="form-label">Select a tier</label>
                                <select
                                    className="form-select"
                                    name="tier"
                                    value={formFields.tier}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select a tier</option>
                                    <option value="Explorer">Explorer</option>
                                    <option value="Protector">Protector</option>
                                    <option value="Guardian">Guardian</option>
                                    <option value="Champion">Champion</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Price</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="price"
                                    value={formFields.price}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Discount</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="discount"
                                    value={formFields.discount}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3 form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="free_parking"
                                    checked={formFields.free_parking}
                                    onChange={handleInputChange}
                                />
                                <label className="form-check-label">Free Parking</label>
                            </div>
                            <div className="mb-3 form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="special_events"
                                    checked={formFields.special_events}
                                    onChange={handleInputChange}
                                />
                                <label className="form-check-label">Special Events</label>
                            </div>
                            <button className="btn btn-primary" type="submit">{submitButtonText} Membership</button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
};

export default Membership;