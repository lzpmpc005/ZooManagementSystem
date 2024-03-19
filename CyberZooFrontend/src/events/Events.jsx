import { useEffect, useState } from "react";
import { getEvents, createEvent, sendEmail } from "../services/eventServices";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "./Events.css";

const Events = ({ userRole }) => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalSendEmail, setShowModalSendEmail] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [submitButtonText, setSubmitButtonText] = useState("");
  const [eventsEndpoint, setEventsEndpoint] = useState("");
  const [formEvents, setFormEvents] = useState({
    title: "",
    description: "",
    start_datetime: "",
    end_datetime: "",
    image_url: "",
    manager: 0,
  });
  const [emailsFound, setEmailsFound] = useState([]);

  const [formSendEmail, setFormSendEmail] = useState({
    event_id: 0,
    membership: "",
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormEvents((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEmailFormChange = (event) => {
    const { name, value } = event.target;
    setFormSendEmail((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const routerChange = (id) => {
    navigate(`/events/${id}`);
  };

  const handleCreateEvent = () => {
    setModalTitle("Create Event");
    setSubmitButtonText("Create Event");
    setEventsEndpoint("/events/");
    setShowModal(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    createEvent(formEvents).then((data) => {
      console.log(data);
      setShowModal(false);
      fetchEvents();
    });
  };

  const handleFormSendEmail = (event) => {
    event.preventDefault();
    sendEmail(formSendEmail)
      .then((data) => {
        setEmailsFound(data);
        fetchEvents();
      })
      .catch((error) => {
        setEmailsFound([]);
        fetchEvents();
      });
  };

  function fetchEvents() {
    getEvents().then((data) => {
      const events_list = data.map((event) => {
        event.start_datetime = new Date(event.start_datetime).toLocaleString();
        event.end_datetime = new Date(event.end_datetime).toLocaleString();
        return event;
      });
      setEvents(events_list);
      console.log(events_list);
    });
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  const Button = ({ title, onClick }) => {
    return (
      <button className="btn btn-primary m-1" onClick={onClick}>
        {title}
      </button>
    );
  };

  return (
    <div className="events-container">
      <h1>Events</h1>
      {userRole === "admin" && (
        <div className="event-admin-buttons">
          <Button title="Create Event" onClick={handleCreateEvent} />
          <Button
            title="Send Email"
            onClick={() => setShowModalSendEmail(true)}
          />
        </div>
      )}

      <div className="event-list">
        {events.map((event) => (
          <div className="event-card" key={event.id}>
            <img
              src={event.image_url}
              alt={event.title}
              onClick={() => routerChange(event.id)}
            />
            <span>
              <b>{event.title}</b>
            </span>
            <span>{event.description}</span>
            <span className="event-date">{event.start_datetime}</span>
            <span className="event-date">{event.end_datetime}</span>
            {userRole === "admin" && (
              <button
                className="btn btn-primary"
                onClick={() => handleCreateEvent(event.id)}
              >
                Edit
              </button>
            )}
          </div>
        ))}
      </div>

      <Modal
        show={showModalSendEmail}
        onHide={() => setShowModalSendEmail(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Send Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleFormSendEmail}>
            <div className="mb-3">
              <label className="form-label">Event</label>
              <select
                className="form-select"
                name="event_id"
                value={formSendEmail.event_id}
                onChange={handleEmailFormChange}
              >
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Membership</label>
              <select
                className="form-select"
                name="membership"
                value={formSendEmail.membership}
                onChange={handleEmailFormChange}
              >
                <option value="Explorer">Explorer</option>
                <option value="Guardian">Guardian</option>
                <option value="Protector">Protector</option>
                <option value="Champion">Champion</option>
              </select>
            </div>

            <button className="btn btn-primary" type="submit">
              SendEmail
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <input
            className="form-control"
            type="text"
            value={JSON.stringify(emailsFound.customers || [])}
            readOnly
          />

          <Button title="Close" onClick={() => setShowModalSendEmail(false)} />
        </Modal.Footer>
      </Modal>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label className="form-label">
                Title:
                <input
                  type="text"
                  name="title"
                  value={formEvents.title}
                  onChange={handleFormChange}
                />
              </label>
            </div>
            <div className="mb-3">
              <label className="form-label">
                Description:
                <input
                  type="text"
                  name="description"
                  value={formEvents.description}
                  onChange={handleFormChange}
                />
              </label>
            </div>

            <div className="mb-3">
              <label className="form-label">
                Start Date:
                <input
                  type="datetime-local"
                  name="start_datetime"
                  value={formEvents.start_datetime}
                  onChange={handleFormChange}
                />
              </label>
            </div>

            <div className="mb-3">
              <label className="form-label">
                End Date:
                <input
                  type="datetime-local"
                  name="end_datetime"
                  value={formEvents.end_datetime}
                  onChange={handleFormChange}
                />
              </label>
            </div>
            <div className="mb-3">
              <label className="form-label">
                Image URL:
                <input
                  type="text"
                  name="image_url"
                  value={formEvents.image_url}
                  onChange={handleFormChange}
                />
              </label>
            </div>
            <div className="mb-3">
              <label className="form-label">
                Manager ID:
                <input
                  type="number"
                  name="manager"
                  value={formEvents.manager}
                  onChange={handleFormChange}
                />
              </label>
            </div>
            <button className="btn btn-primary" type="submit">
              {submitButtonText}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Events;
