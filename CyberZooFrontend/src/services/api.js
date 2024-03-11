import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

export default instance;
