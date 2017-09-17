import React, { Component } from 'react';
import { IconButton, IconMenu, MenuItem, AppBar, FlatButton } from 'material-ui';
import config from 'config';

import PropTypes from 'prop-types';
import authRedux from '../../lib/reduxes/auth';
import request from 'superagent';
const apiUrl = `http://${config.api.host}:${config.api.port}`;

export default class Head extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false
    };
  }


  renderButton() {
    let element = null;
    if (authRedux.getState()) {
      element = <FlatButton onTouchTap={ this.logout }> { 'Logout' } </FlatButton>
    } else {
      element = <FlatButton label='login' labelStyle={ { fontWeight: 'bold', fontSize: 16 } }>  </FlatButton>
    }
    return element
  }

  logout = () => {
    const self = this;
    request
    .get(`${apiUrl}/logout`)
    .withCredentials()
    .set('Access-Control-Allow-Origin', 'http://localhost:3000')
    .set('Access-Control-Allow-Credentials', true)
    .end((err, res) => {
      if (err) {
        console.error(err)
      } else {
        console.log('logged out result', res, authRedux.getState());
      }
    });
  }

  render = () =>
    <AppBar
      title={ this.props.title }
      style={ this.props.style }
      onLeftIconButtonTouchTap={ this.props.onLeftIconButtonTouchTap }
      iconElementRight={ this.renderButton() }
      className={ 'head' }
    />
}

Head.propTypes = {
  title: PropTypes.string.isRequired,
  onLeftIconButtonTouchTap: PropTypes.func.isRequired
};
