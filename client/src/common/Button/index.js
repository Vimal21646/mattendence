import React, { Component } from 'react';
import './index.css';

class Button extends Component {
  render() {
    return (
      <div className={this.props.className} onClick={this.props.onClick}>{this.props.children}</div>
    );
  }
}

export default Button;
