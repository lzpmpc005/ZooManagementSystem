import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./services/userServices";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  function loginUser(event) {
    event.preventDefault();
    login(username, password)
      .then((response) => {
        console.log(response.data);
        setUsername("");
        setPassword("");
        setError("");
        onLogin(response.data.username, response.data.id);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        setError("Invalid username or password");
      });
  }

  return (
    <div className="container mt-3">
      <form onSubmit={loginUser}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <div>{error && <small className="text-danger">{error}</small>}</div>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
