import React, { Component } from 'react';
import './index.css';

class Login extends Component {
  render() {
    return (
      <div className="container">
        <div className="heading">
          
        </div>
        <div className="Login-content">
          <div className="fill-width">
            Welcome to this simple Employees Attendance Tracker web-app developed using React!
          </div>
          <br/>
          <div className="fill-width">
            There are no logins (as of now, because of time constraints), just use the app right away! 
          </div>
          <br/>
          <div className="fill-width">
            Employees data are scrapped from Tokopedia team page (the Nakamas!)
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
