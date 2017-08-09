import React, { Component } from 'react';
import Core from '../components/core';
export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

componentWillReceiveProps() {}

  render() {
    return(
      <div>
        <Core />
        <img src="https://s-media-cache-ak0.pinimg.com/736x/74/33/ca/7433cab8c7a49b52d2f5276a83826002--funny-emoji-emotion-faces.jpg" />
      </div>
    );
  }
}
