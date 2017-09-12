import React, { Component } from 'react';
import './index.css';

class TextBox extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <input type="text" className={this.props.className} placeholder={this.props.placeholder} onChange={this.props.onChange} value={this.props.value}/>
    );
  }
}

export default TextBox;
