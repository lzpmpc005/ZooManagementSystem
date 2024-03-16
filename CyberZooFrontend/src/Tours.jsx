import { Link } from "react-router-dom";
import TourDetails from "./tours/tourDetails";

import React, { useState, useEffect } from "react";

function Tours() {
    const [tours, setTours] = useState([]);

    useEffect(() => {
        async function fetchTours() {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/get_tours/");
                if (!response.ok) {
                  throw new Error("Failed to fetch tours");
                }
                const toursData = await response.json();
                setTours(toursData);
              } catch (error) {
                console.error(
                  "There has been a problem with your fetch operation:",
                  error
                );
              }
            }
        
            fetchTours();
          }, []);

    return (
        <div>
            <h3 style={{ textAlign: "center" }}>Check Existing Tours</h3>
            <table
                className="tour-table"
                style={{ width: "100%", borderCollapse: "collapse" }}
            >
                <tbody>
                    {tours.map((tour) => (
                        <React.Fragment key={tour.id}>
                            <tr style={{ backgroundColor: "#f2f2f2" }}>
                                <th>Tour ID</th>
                                <th>Guide</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                            </tr>
                            <tr style={{ borderBottom: "1px solid #ddd" }}>
                                <td>{tour.id}</td>
                                <td>{tour.guide && tour.guide.user ? tour.guide.user.username : 'No guide assigned'}</td>
                                <td>{tour.name}</td>
                                <td>{tour.description}</td>
                                <td>{tour.start_time}</td>
                                <td>{tour.end_time}</td>
                                <td>
                                    <Link to={`/tourDetails/${tour.id}`}>View Details</Link>
                                </td>
                                
                            </tr>
                            <tr>
                                <td colSpan="5">
                                    <div
                                        style={{
                                            padding: "10px",
                                            backgroundColor: "#f9f9f9",
                                            borderRadius: "5px",
                                            marginBottom: "20px",
                                        }}
                                    >
                                        <h4 style={{ marginBottom: "10px" }}>
                                            Routes and Schedule
                                        </h4>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <table style={{ width: "45%" }}>
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
                                            <table style={{ width: "45%" }}>
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
    );
}

export default Tours;
