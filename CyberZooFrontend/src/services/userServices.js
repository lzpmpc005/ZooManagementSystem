import instance from "./api";

export const login = (username, password) => {
  return instance
    .post("login/", {
      username,
      password,
    })
    .then((response) => {
      console.log(response);
      return response;
    });
};

export const logout = () => {
  return instance
    .post("logout/", {}, { withCredentials: true })
    .then((response) => {
      return response;
    });
};


export const register = (username, password, email, age) => {
  return instance
    .post("register/", {
      username,
      password,
      email,
      age,
    })
    .then((response) => {
      console.log(response);
      return response;
    });
};