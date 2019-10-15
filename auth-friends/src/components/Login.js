import React from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: ""
    }
  };
  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.tarkget.name]: e.target.value
      }
    });
  };

  login = e => {
    e.preventDefault();
    //login to retrieve the JWT token
    //add the token to localStorage
    //route to '/protected' landing page
    axiosWithAuth()
      .post("/api/login", this.state.credentials)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        this.props.history.push("/protected");
      })
      .catch(err => console.log(err.response));
  };
  render() {
    if (localStorage.getItem("token")) {
      return <Redirect to="protected" />;
    }
    return (
      <div>
        <form onSubmit={this.login}>
          <input
          type='text'
          name='username'
          value={this.state.credentials.username}
          onChange={this.handleChange}
          />
          <input
          type='password'
          name='password'
          value={this.state.credentials.password}
          onChange={this.handleChange}
          />
          <button>Log In</button>
        </form>
      </div>
    );
  }
}

export default Login;
