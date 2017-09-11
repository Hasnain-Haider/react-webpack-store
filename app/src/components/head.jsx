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
    return authRedux.getState() ?
      (<FlatButton onTouchTap={ this.logout }> { 'Logout' } </FlatButton> ) :
      (<FlatButton label='login' labelStyle={ { fontWeight: 'bold', fontSize: 16 } }>  </FlatButton>)
  }

  logout = () => {
    const self = this;
    request
    .get(`${apiUrl}/logout`)
    .withCredentials()
    .end((err, res) => {
      if (err) {
        console.error(err)
      } else {
        console.log('leanr', res, authRedux.getState());
      }
    });
  }

  render() {
    return (
      <AppBar
        title={ this.props.title }
        style={ this.props.style }
        onLeftIconButtonTouchTap={ this.props.onLeftIconButtonTouchTap }
        iconElementRight={ this.renderButton() }
      />
    );
  }
}

Head.propTypes = {
  title: PropTypes.string.isRequired,
  onLeftIconButtonTouchTap: PropTypes.func.isRequired
};
