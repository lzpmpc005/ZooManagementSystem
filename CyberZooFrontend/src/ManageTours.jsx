import { useMultistepForm } from "./MultistepForm";
import { TourForm1 } from "./TourForm1";
import { TourForm2 } from "./TourForm2";
import { TourForm3 } from "./TourForm3";
import { TourForm4 } from "./TourForm4";
import { TourForm5 } from "./TourForm5";
import { TourForm6 } from "./TourForm6";
import { TourForm7 } from "./TourForm7";

import React, { useState, useEffect } from "react";


const INITIAL_DATA = {
    name: "",
    description: "",
    start_time: "",
    habitat1_id: "",
    leave_time1: "",
    habitat2_id: "",
    leave_time2: "",
    habitat3_id: "",
    leave_time3: "",
    habitat4_id: "",
    leave_time4: "",
    habitat5_id: "",
    leave_time5: "",
    habitat6_id: "",
    end_time: "",
};

function ManageTours() {
    const [tours, setTours] = useState([]);

    useEffect(() => {
        async function fetchTours() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/get_tours/');
                if (!response.ok) {
                    throw new Error('Failed to fetch tours');
                }
                const toursData = await response.json();
                setTours(toursData);
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        }

        fetchTours();
    }, []);

    const [toBeDeleted, setToBeDeleted] = useState(null);

    async function deleteTour(id) {
        if (toBeDeleted !== id) {
            setToBeDeleted(id);
            const confirmed = window.confirm('Are you sure you want to delete this tour? Click OK to confirm.');
            if (!confirmed) {
                return;
            }
        }
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/delete_tour/${id}/`, {
                method: 'POST',
            });
            if (!response.ok) {
                throw new Error('Failed to delete tour');
            }
            setTours(tours.filter(tour => tour.id !== id));
            setToBeDeleted(null);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }

    console.log("ManageTours");
    const [data, setData] = useState(INITIAL_DATA);
    const [errorMessage, setErrorMessage] = useState(null);

    function updateFields(fields) {
        setData(prevData => ({ ...prevData, ...fields }));
    }

    function resetStep(stepIndex) {
        switch(stepIndex) {
            case 1:
                updateFields({ habitat1_id: null, leave_time1: null });
                break;
            case 2:
                updateFields({ habitat2_id: null, leave_time2: null });
                break;
            case 3:
                updateFields({ habitat3_id: null, leave_time3: null });
                break;
            case 4:
                updateFields({ habitat4_id: null, leave_time4: null });
                break;
            case 5:
                updateFields({ habitat5_id: null, leave_time5: null });
                break;
            case 6:
                updateFields({ habitat6_id: null, end_time: null });
                break;
            default:
                break;
        }
    }

    const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultistepForm([
        { component: TourForm1, props: { ...data, updateFields } },
        { component: TourForm2, props: { id: "0", start_time: data.start_time, ...data, updateFields } },
        { component: TourForm3, props: { habitat1_id: data.habitat1_id, leave_time1: data.leave_time1, ...data, updateFields } },
        { component: TourForm4, props: { habitat2_id: data.habitat2_id, leave_time2: data.leave_time2, ...data, updateFields } },
        { component: TourForm5, props: { habitat3_id: data.habitat3_id, leave_time3: data.leave_time3, ...data, updateFields } },
        { component: TourForm6, props: { habitat4_id: data.habitat4_id, leave_time4: data.leave_time4, ...data, updateFields } },
        { component: TourForm7, props: { habitat5_id: data.habitat5_id, leave_time5: data.leave_time5, ...data, updateFields } },
    ], resetStep);

    function validateStep(stepData) {
        if (currentStepIndex === 1) {
            const startTime = convertTimeToInt(data[`start_time`]);
            const leaveTime1 = convertTimeToInt(stepData[`leave_time${currentStepIndex}`]);
            
            if (startTime && leaveTime1) {
                const diffInMinutes = (leaveTime1 - startTime);
                
                console.log('diffInMinutes:', diffInMinutes); 
               
                if (diffInMinutes < 0) {
                    return 'Invalid Time! Earlier than previous leave time.';
                }

                if (diffInMinutes < 20) {
                    return 'Invalid Time! Stay Too Short.';
                }

                if (diffInMinutes > 60) {
                    return 'Invalid Time! Stay Too Long.';
                }
            }
        }

        else if (currentStepIndex > 1) {
        // Check if habitat_id is already chosen
            for (let i = 1; i <= currentStepIndex - 1; i++) {
                if (data[`habitat${i}_id`] === stepData[`habitat${currentStepIndex}_id`]) {
                    return 'This habitat is already chosen for this tour.';
                }
            }
            
            const previousLeaveTime = convertTimeToInt(data[`leave_time${currentStepIndex-1}`]);
            const currentLeaveTime = convertTimeToInt(stepData[`leave_time${currentStepIndex}`]);

            if (previousLeaveTime && currentLeaveTime) {
                const diffInMinutes = (currentLeaveTime - previousLeaveTime);
                
                console.log('diffInMinutes:', diffInMinutes); 
                
                if (diffInMinutes < 0) {
                    return 'Invalid Time! Earlier than previous leave time.';
                }

                if (diffInMinutes < 20) {
                    return 'Invalid Time! Stay Too Short.';
                }

                if (diffInMinutes > 60) {
                    return 'Invalid Time! Stay Too Long.';
                }
            }
        }
    
        // Check if leave_time - previous leave_time > 20min
        
        return null;
    }
    function convertTimeToInt(timeString) {
        const [hours, minutes] = timeString.split(':');
        return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
    }

    async function onSubmit(e) {
        e.preventDefault();

        const stepData = steps[currentStepIndex].props;
        console.log('stepData:', stepData);
        const validationError = validateStep(stepData);
        
        if (validationError) {
            setErrorMessage(validationError);
            window.alert(validationError);
            return;
        }

        if (isLastStep) {
            console.log(data);
            try {
                const response = await fetch('http://127.0.0.1:8000/api/create_tour/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    setErrorMessage(errorData.message);
                    console.log(errorMessage);
                    return;
                }
                const jsonResponse = await response.json();
                console.log(jsonResponse);
                window.alert(jsonResponse.detail); 
                window.location.reload();
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        } else {
            next();
        }
    }

    return (
        <div>
            <div
                style={{
                    position: "relative",
                    background: "white",
                    border: "1px solid black",
                    padding: "20px",
                    margin: "20px",
                    borderRadius: "10px",
                    fontFamily: "Arial, sans-serif",
                }}
            >

                <form onSubmit={onSubmit}>
                    <div style={{ position: "absolute", top: ".5rem", right: ".5rem" }}>
                        {currentStepIndex + 1} / {steps.length}
                    </div>
                    {step}
                    <div
                        style={{
                            marginTop: "1rem",
                            display: "flex",
                            gap: "1rem",
                            justifyContent: "flex-end",
                        }}
                    >
                        {!isFirstStep && <button type="button" onClick={back}>Back</button>}
                        <button type="submit">{isLastStep ? "Finish" : "Next"}</button>
                    </div>
                </form>
            </div>

            <div className="tour-list" 
                style={{
                        position: "relative",
                        background: "white",
                        border: "1px solid black",
                        padding: "20px",
                        margin: "20px",
                        borderRadius: "10px",
                        fontFamily: "Arial, sans-serif",
                    }}>
                <h3 style={{textAlign: "center"}}>Check Existing Tours</h3>
                <table className="tour-table" style={{width: "100%", borderCollapse: "collapse"}}>
                    {/* <thead></thead> */}
                    <tbody>
                    {tours.map(tour => (
                        <React.Fragment key={tour.id}>
                            <tr style={{backgroundColor: "#f2f2f2"}}>
                                <th>Tour ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                
                            </tr>
                            <tr style={{borderBottom: "1px solid #ddd"}}>
                                <td>{tour.id}</td>
                                <td>{tour.name}</td>
                                <td>{tour.description}</td>
                                <td>{tour.start_time}</td>
                                <td>{tour.end_time}</td>
                                <td><button onClick={() => deleteTour(tour.id)}>Delete</button></td>
                            </tr>
                            <tr>
                            <td colSpan="5">
                                <div style={{padding: "10px", backgroundColor: "#f9f9f9", borderRadius: "5px", marginBottom: "20px"}}>
                                    <h4 style={{marginBottom: "10px"}}>Routes and Schedule</h4>
                                    <div style={{display: "flex", justifyContent: "space-between"}}>
                                        <table style={{width: "45%"}}>
                                            <tbody>
                                                <tr>
                                                    <td>Habitat1:</td>
                                                    <td>{tour.habitat1.name}</td>
                                                    <td>Leave Time:</td>
                                                    <td>{tour.leave_time1}</td>
                                                </tr>
                                                <tr>
                                                    <td>Habitat2:</td>
                                                    <td>{tour.habitat2.name}</td>
                                                    <td>Leave Time:</td>
                                                    <td>{tour.leave_time2}</td>
                                                </tr>
                                                <tr>
                                                    <td>Habitat3:</td>
                                                    <td>{tour.habitat3.name}</td>
                                                    <td>Leave Time:</td>
                                                    <td>{tour.leave_time3}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table style={{width: "45%"}}>
                                            <tbody>
                                                <tr>
                                                    <td>Habitat4:</td>
                                                    <td>{tour.habitat4.name}</td>
                                                    <td>Leave Time:</td>
                                                    <td>{tour.leave_time4}</td>
                                                </tr>
                                                <tr>
                                                    <td>Habitat5:</td>
                                                    <td>{tour.habitat5.name}</td>
                                                    <td>Leave Time:</td>
                                                    <td>{tour.leave_time5}</td>
                                                </tr>
                                                <tr>
                                                    <td>Habitat6:</td>
                                                    <td>{tour.habitat6.name}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </td>
                            </tr>
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManageTours;