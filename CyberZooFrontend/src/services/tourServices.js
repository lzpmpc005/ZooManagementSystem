import instance from "./api";

export const listFeedback = async () => {
  const response = await instance.get("/feedbacks/");
  return response;
};

export const createFeedback = async (name, email, message, tour) => {
  const response = await instance.post("/feedbacks/", {
    name,
    email,
    message,
    tour,
    feedback_time: new Date(),
  });
  return response;
};

export const getTour = async (tourId) => {
  const response = await instance.get(`get_tour/${tourId}`);
  return response;
};
