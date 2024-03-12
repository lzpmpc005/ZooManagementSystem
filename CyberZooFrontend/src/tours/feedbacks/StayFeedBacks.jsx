import { useState } from "react";
import { createFeedback } from "../../services/tourServices";

const StayFeedback = ({ tourId }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (name && email && message) {
      createFeedback(name, email, message, tourId);
      setName("");
      setEmail("");
      setMessage("");
    } else {
      setError("Please fill in all fields");
    }
  };

  return (
    <div className="feedbacks">
      <h2>Write Feedback</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      {error && <p className="error">{error}</p>}
      <button onClick={handleSubmit}>Submit Feedback</button>
    </div>
  );
};

export default StayFeedback;
