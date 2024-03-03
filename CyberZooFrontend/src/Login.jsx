import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
    };
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  }

  login = (event) => {
    event.preventDefault();
    fetch('http://127.0.0.1:8000/api/login/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookies.get('csrftoken'),
      },
      body: JSON.stringify({ username: this.state.username, password: this.state.password }),
      credentials: 'same-origin',
    })
    .then(this.ifResponseOk)
    .then((data) => {
      console.log(data);
      this.setState({ username: '', password: '', error: '' });
    })
    .catch((error) => {
      console.log(error);
      this.setState({ error: 'Invalid username or password' });
    });
  }

  render() {
    return (
      <div className="container mt-3">
        <h1>CyberZoo</h1>
        <br />
        <h2>Login</h2>
        <form onSubmit={this.login}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" 
              id="username" value={this.state.username} 
              onChange={this.handleUsernameChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              name="password" 
              value={this.state.password} 
              onChange={this.handlePasswordChange} />
            <div>
              {this.state.error && <small className='text-danger'>{this.state.error}</small>}
            </div>
          </div> 
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
