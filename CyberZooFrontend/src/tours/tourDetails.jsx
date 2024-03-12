import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Feedbacks from "./feedbacks/Feedbacks";
import StayFeedback from "./feedbacks/StayFeedBacks";
import "./Tours.css";
import { getTour } from "../services/tourServices";

const TourDetails = () => {
  const [tour, setTour] = useState({});
  const { tourId } = useParams();

  async function fetchTours() {
    getTour(tourId).then((response) => {
      setTour(response.data);
    });
  }

  useEffect(() => {
    fetchTours().then(() => {
      console.log(tour);
    });
  }, []);

  return (
    <div>
      <div className="tour-details">
        <h2>Tour Details</h2>
        <p>Name: {tour.name}</p>
        <p>Description: {tour.description}</p>
        <p>StartTime: {tour.start_time}</p>
        {tour.habitat1 && (
          <>
            <p>Habitat 1: {tour.habitat1.name}</p>
            <p>Leave Time 1: {tour.leave_time1}</p>
          </>
        )}
        {tour.habitat2 && (
          <>
            <p>Habitat 2: {tour.habitat2.name}</p>
            <p>Leave Time 2: {tour.leave_time2}</p>
          </>
        )}
        {tour.habitat3 && (
          <>
            <p>Habitat 3: {tour.habitat3.name}</p>
            <p>Leave Time 3: {tour.leave_time3}</p>
          </>
        )}
        {tour.habitat4 && (
          <>
            <p>Habitat 4: {tour.habitat4.name}</p>
            <p>Leave Time 4: {tour.leave_time4}</p>
          </>
        )}
        {tour.habitat5 && (
          <>
            <p>Habitat 5: {tour.habitat5.name}</p>
            <p>Leave Time 5: {tour.leave_time5}</p>
          </>
        )}
        {tour.habitat6 && (
          <>
            <p>Habitat 6: {tour.habitat6.name}</p>
          </>
        )}
        <p>EndTime: {tour.end_time}</p>
      </div>
      <Feedbacks />
      <StayFeedback tourId={tourId} />
    </div>
  );
};

export default TourDetails;
