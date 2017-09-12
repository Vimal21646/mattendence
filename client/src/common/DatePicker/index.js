import React, { Component } from 'react';
import './index.css';

class DatePicker extends Component {
  render() {
    return (
      <input type="date" className={this.props.className + " myInput"} placeholder={this.props.placeholder} onChange={this.props.onChange} value={this.props.value}/>
    );
  }
}

export default DatePicker;
