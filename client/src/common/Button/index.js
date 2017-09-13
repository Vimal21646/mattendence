import React, { Component } from 'react';
import './index.css';

class Button extends Component {
  render() {
    return (
      <div tabIndex="0" 
          className={this.props.className} 
          onClick={this.props.onClick}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Button;
