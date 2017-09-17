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
    let labelStyle = {
      fontWeight: 'bold',
      fontSize: 16,
      color: 'white'
    }
    if (authRedux.getState().username) {
      return <FlatButton
        label={'logout'}
        labelStyle={ labelStyle }
        onTouchTap={ this.logout }
        />
    } else {
      return <FlatButton
        label={'login'}
        labelStyle={ labelStyle }
        onTouchTap={ () => this.navigateTo('login') }
        />
    }
  }

  navigateTo = (route) => {
    this.props.history.push(route);
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
        this.navigateTo('/');
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
