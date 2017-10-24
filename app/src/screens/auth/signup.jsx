import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Screen from '../screen';
import request from 'superagent';
import config from 'config';
import Auth from './auth';
const apiUrl = `http://${config.api.host}:${config.api.port}`;


export default class SignUp extends Screen {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit = (user) => {
    request
    .post(`${apiUrl}/api/signup`)
    .send(user)
    .withCredentials()
    .end((err, res) => {
      if (err) {
        console.error(err);
      } else {
        console.log(res);
        this.props.history.push('/login');
      }
    });
  }

  render = () =>
    <div>
      <Auth
        hTitle={ 'signup' }
        submit={ this.submit }
        btnLabel={ 'signup' }
      />
    </div>
}
