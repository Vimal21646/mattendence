import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import Login from './Login/index';
import Home from './Home/index';
import { EmployeeIndex, EmployeeInsertForm, EmployeeUpdateForm } from './Employee';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <span className="App-name">Employees Attendance Tracker</span>
        </div>
        <div className="App-content">
          <Link to={`/`}>Login</Link>
          |<Link to={`/home`}>Home</Link>
          |<Link to={`/employee`}>Employee</Link>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/employee" component={EmployeeIndex} />
          <Route exact path="/employee/add" component={EmployeeInsertForm} />
          <Route exact path="/employee/edit/:_id" component={EmployeeUpdateForm} />
        </div>
      </div>
    );
  }
}

export default App;
