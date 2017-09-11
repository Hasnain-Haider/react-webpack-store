import React, { Component } from 'react';
import Core from '../components/core';
import { Paper } from 'material-ui';
import PropTypes from 'prop-types';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  render = () =>
    <div>
      <Core history={ this.props.history } />
      <Paper>
        YELLOW!
      </Paper>
    </div>
}
