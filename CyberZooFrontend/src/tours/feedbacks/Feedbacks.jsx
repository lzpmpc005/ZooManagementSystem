import { useState, useEffect } from "react";
import { listFeedback } from "../../services/tourServices";
import "./Feedbacks.css";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    listFeedback().then((response) => {
      setFeedbacks(response.data);
    });
  }, []);

  return (
    <div className="feedbacks">
      <h2>All Feedbacks</h2>
      <ul>
        {feedbacks.map((feedback, index) => (
          <div key={index} className="feedback">
            <h3>{feedback.name}</h3>
            <h5>{feedback.email}</h5>
            <div className="feedback-message">
              {feedback.message}
              <p>{feedback.feedback_time}</p>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Feedback;
