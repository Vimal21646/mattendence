import React, { Component } from 'react';
import Button from './../common/Button';
import TextBox from './../common/TextBox';
import './index.css';

class EmployeeInsertForm extends Component {
  render() {
    return (
      <div className="container">
        <div className="heading">
          Add a new employee
        </div>
        <div className="content">
          <TextBox placeholder="asdasd"/>
        </div>
      </div>
    );
  }
}

export default EmployeeInsertForm;