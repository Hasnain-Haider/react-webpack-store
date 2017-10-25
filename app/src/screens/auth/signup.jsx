import React from 'react';
import PropTypes from 'prop-types';
import Screen from '../screen';
import request from 'superagent';
import config from 'config';
import Auth from './auth';
import authRedux from 'lib/reduxes/auth';
import alertRedux from 'lib/reduxes/alert';

export default class SignUp extends Screen {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(user) {
    return request
      .post(`${apiUrl}/signup`)
      .send(user)
      .withCredentials()
      .end((err, res) => {
        console.log({err}, {res});
        if (err) {
          console.error('user was not created', err);
          if (res.body.result === 'user') {
            alertRedux.dispatch({
              type: 'SNACKBAR',
              message: "user already exists"
            });
          } else if (res.body.result === 'email') {
            alertRedux.dispatch({
              type: 'SNACKBAR',
              message: "Email already exists"
            });
          }
        } else {
          authRedux.dispatch({
            type: 'SIGNUP',
            user: res.body
          });
          this.props.history.push('/login');
        }
      });
  }

  render() {
    return (
      <div>
        <Auth
          hTitle={ 'signup' }
          submit={ this.submit }
          btnLabel={ 'signup' }
        />
      </div>
    );
  }
}
