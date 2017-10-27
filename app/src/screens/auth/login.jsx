// Ext Deps
import React from 'react';
import request from 'superagent';
import PropTypes from 'prop-types';
// Internal
import authRedux from 'lib/reduxes/auth';

import Screen from '../screen';
import Auth from './auth';

export default class Login extends Screen {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }


  submit(loginBody) {
    return request
      .post(`${apiUrl}/login`)
      .send(loginBody)
      .withCredentials()
      .end((err, res) => {
        if (err) {
          console.error('therewas an error,', err);
        } else {
          authRedux.dispatch({
            type: 'LOGIN',
            user: res.body
          });
          this.props.history.push('/home');
        }
      });
  }

  render() {
    return (
      <div>
        <Auth
          hTitle={ 'Login' }
          submit={ this.submit }
          btnLabel={ 'login' }
        />
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object.isRequired
};
