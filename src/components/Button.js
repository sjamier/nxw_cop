import React, { Component } from 'react';

class Button extends Component {
  constructor(props){
    super(props);
    this.state = {
      text : '',
      path : '',
      styleClass : '',
      icon : '',
    }
  }

  componentDidMount(){
    this.setState({
      text : this.props.text,
      path : this.props.path,
      styleClass : this.props.styleClass,
      icon : this.props.icon,
    })
  }
  render(){
    return <a href={`${this.state.path}`} className={`btn ${this.state.styleClass}`} target='_self'><span className={`btn-icon ${this.state.icon}`}></span><span className='btn-text'>{ this.state.text }</span></a>
  }
}

export default Button;
