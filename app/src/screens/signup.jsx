import React, { Component } from 'react';
import Core from '../components/core';
import { Paper } from 'material-ui';

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
        <Paper>
          YELLOW!
        </Paper>
      </div>
    );
  }
}
