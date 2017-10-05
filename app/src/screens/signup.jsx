import React, { Component } from 'react';
import { Paper } from 'material-ui';
import PropTypes from 'prop-types';
import request from 'superagent';
import config from 'config';
import Core from '../coreComponents/core';
import authRedux from '../../lib/reduxes/auth';
const apiUrl = `http://${config.api.host}:${config.api.port}`;

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

    </Paper>
  </div>
}
