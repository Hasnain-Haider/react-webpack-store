import React, { Component } from 'react';
import {
  AppBar,
  FlatButton,
  RaisedButton,
  ToolbarGroup
} from 'material-ui';

import PropTypes from 'prop-types';
import request from 'superagent';

import authRedux from 'lib/reduxes/auth';
import 'styles/core/header';
export default class Head extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false
    };
  }

  getUsername() {
    const username = authRedux.getState().username;
    return (
      <FlatButton
        label={ username || 'Not Signed in' }
        className={ 'username-btn' }
        color={ 'orange' }
        onTouchTap={ () => {
          username ? this.props.navigateTo('/account') : null;
        } }
      />
    );
  }


  logout() {
    const self = this;
    request
      .get(`${apiUrl}/logout`)
      .withCredentials()
      .end((err, res) => {
        if (err) {
          console.error(err);
        } else {
          console.debug('logout');
          authRedux.dispatch({ type: 'LOGOUT' });
          this.props.navigateTo('/home');
        }
      });
  }

  renderButton() {
    let Button;
    if (authRedux.getState().username) {
      Button = (<RaisedButton
        className={ 'log-btn logout-btn' }
        label={ 'logout' }
        secondary
        onTouchTap={ this.logout }
      />);
    } else {
      Button = (<RaisedButton
        className={ 'log-btn login-btn' }
        label={ 'logout' }
        secondary
        onTouchTap={ () => this.props.navigateTo('/login') }
      />);
    }
    return (
      <ToolbarGroup>
        { this.getUsername() }
        { Button }
      </ToolbarGroup>
    );
  }

  render() {
    return (
      <AppBar
        title={ this.props.title }
        style={ this.props.style }
        onLeftIconButtonTouchTap={ this.props.onLeftIconButtonTouchTap }
        iconElementRight={ this.renderButton() }
        className={ 'header' }
      />
    );
  }
}

Head.propTypes = {
  title: PropTypes.string.isRequired,
  onLeftIconButtonTouchTap: PropTypes.func.isRequired
};
