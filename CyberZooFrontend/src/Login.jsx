import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./services/userServices";


const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [age, setAge] = useState("");
  const [membership, setMembership] = useState("");
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
        if ('role' in response.data) {
          setRole(response.data.role);
          onLogin(response.data.username, response.data.id, response.data.role); 
        } else if ('age' in response.data) {
          setAge(response.data.age);
          setMembership(response.data.membership);
          onLogin(response.data.username, response.data.id, "", response.data.age, response.data.membership);
        }
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        setError("Invalid username or password");
      });
  }

  const goToRegister = () => {
    navigate("/register");
  };

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
        <button type="submit" className="btn btn-primary mt-3">
          Login
        </button>
        <div className="mt-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={goToRegister}
          >
            Haven't registered yet? Sign up here!
          </button>
        </div>        
      </form>
    </div>
  );
};

export default Login;
