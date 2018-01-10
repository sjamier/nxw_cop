import React, { Component } from 'react';

class Button extends Component {
  constructor(props){
    super(props);
    this.state = {
      text : '',
      path : '',
      style : '',
      icon : '',
    }
  }

  componentDidMount(){
    this.setState({
      text : this.props.text,
      path : this.props.path,
      style : this.props.style,
      icon : this.props.icon,
    })
  }
  render(){
    return <a href={`${this.state.path}`} className={`btn ${this.state.style}`} target='_self'><span className={`btn-icon ${this.state.icon}`}></span><span className='btn-text'>{ this.state.text }</span></a>
  }
}

export default Button;
