import instance from "./api";

export const getEvents = async () => {
  try {
    const response = await instance.get("events/");
    return response.data;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    throw error;
  }
};

export const getEvent = async (id) => {
  try {
    const response = await instance.get(`events/${id}/`);
    return response.data;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    throw error;
  }
};

export const createEvent = async (data) => {
  try {
    const response = await instance.post("events/", data);
    return response.data;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    throw error;
  }
};

export const updateEvent = async (id, data) => {
  try {
    const response = await instance.put(`events/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    throw error;
  }
};

export const deleteEvent = async (id) => {
  try {
    const response = await instance.delete(`events/${id}/`);
    return response.data;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    throw error;
  }
};

export const sendEmail = async (data) => {
  try {
    const response = await instance.post("send_event_email/", data);
    return response.data;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    throw error;
  }
};
