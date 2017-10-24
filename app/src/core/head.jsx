import React, { Component } from 'react';
import {
  IconButton,
  IconMenu,
  MenuItem,
  AppBar,
  FlatButton,
  Paper,
  RaisedButton,
  ToolbarGroup,
  CircularProgress
} from 'material-ui';

import PropTypes from 'prop-types';
import request from 'superagent';
import config from 'config';
import authRedux from 'lib/reduxes/auth';

const apiUrl = `http://${config.api.host}:${config.api.port}/api`;
export default class Head extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false
    };

  }


  getUsername() {
    let username = authRedux.getState().username;
    let labelStyle = {
      fontWeight: 'bold',
      fontSize: 16,
      borderRadius: '5px',
      border: 'solid 1px black',
      padding: 8,
      color: 'black'
    }

    return (
      <FlatButton
        label={ username || 'Not Signed in' }
        labelStyle={ labelStyle }
        color={ 'orange' }
        onTouchTap={ ()=> {
          username ?
          this.props.navigateTo('/account') : null
        } }
      />
    )
  }

  renderButton = () => {
    let text = '';
    let Button;
    let labelStyle = {
      fontWeight: 'bold',
      borderRadius: '5px',
      fontSize: 16,
      color: 'white'
    }
    if (authRedux.getState().username) {
        Button = <RaisedButton
          label={ 'logout' }
          secondary
          labelStyle={ labelStyle }
          onTouchTap={ this.logout }
        />
    } else {
        Button = <RaisedButton
          label={ 'login' }
          secondary
          labelStyle={ labelStyle }
          onTouchTap={ () => this.props.navigateTo('/login') }
        />
    }
    return(
      <ToolbarGroup>
        { this.getUsername() }
        { Button }
      </ToolbarGroup>
    )
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
        console.debug('logout');
        authRedux.dispatch({type: 'LOGOUT'});
        this.props.navigateTo('/home');
      }
    });
  }

  render = () => (
      <AppBar
        title={ this.props.title }
        style={ this.props.style }
        onLeftIconButtonTouchTap={ this.props.onLeftIconButtonTouchTap }
        iconElementRight={ this.renderButton() }
        className={ 'head' }
      />
    )
  }

Head.propTypes = {
  title: PropTypes.string.isRequired,
  onLeftIconButtonTouchTap: PropTypes.func.isRequired
};
