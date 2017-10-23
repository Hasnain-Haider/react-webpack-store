import React, { Component } from 'react';
import {
  Paper,
  TextField,
  FlatButton,
  RaisedButton,
  Snackbar,
  CircularProgress,
  Fade
} from 'material-ui';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import Screen from '../screen';
import { every } from 'lodash';
import request from 'superagent';
import config from 'config';
import authRedux from 'lib/reduxes/auth';
const apiUrl = `http://${config.api.host}:${config.api.port}`;
const centerStyle = {
  margin: "3%",
  textAlign: 'center'
}

export default class Auth extends Screen {
  constructor(props) {
    super(props);
    const user = {
      email: '',
      password: '',
      username: ''
    }
    this.state = {
      submitOk: false,
      loading: false,
      snackOpen: false,
      badPasswordText: null,
      badEmailText: null,
      badUsernameText: null,
      user
    };
  }

  handleChange = (fieldName, event) => {
    const updatedUser = {
      ...this.state.user,
      [fieldName]: event.target.value
    }
    this.setState({
      user: updatedUser
    });
  }

  closeSnackbar = () => {
    this.setState({
      snackOpen: false
    });
  }

  validate = () => {
    const { email, password, username } = this.state.user;
    try {
      return every([email, password, username], x => x.length > 4);
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  render = () =>
  <div>
    <Paper>
      <Col md={ 8 } lg={ 6 } style={{ padding: "10%"}}>
        <h1 style={ centerStyle }>Signup Page</h1>
        <Paper style={ {
            padding: "10%",
            ...centerStyle
          } }
          >
          <div style={{margin : 'auto'}}>
            <Row>
              <TextField
                placeholder={ 'Email' }
                style={ centerStyle }
                name={ 'email' }
                value={ this.state.email }
                errorText={ this.state.badEmailText }
                onChange={ this.handleChange.bind(this, 'email') }
                />
            </Row>
            <Row>
              <TextField
                placeholder={ 'Username' }
                style={ centerStyle }
                name={ 'username' }
                value={ this.state.username }
                errorText={ this.state.badUsernameText }
                onChange={ this.handleChange.bind(this, 'username') }
                />
            </Row>
            <Row>
              <TextField
                placeholder={ "Password" }
                errorText={ this.state.badPasswordText }
                name={ 'password' }
                style={ centerStyle }
                value={ this.state.password }
                onChange={ this.handleChange.bind(this, 'password') }
                type={ "password" }
                />
            </Row>
            <RaisedButton
              style={ {  width: 60, ...centerStyle } }
              label={ 'login' }
              id={ 'login-btn' }
              disabled={ !this.validate() }
              onTouchTap={ this.props.submit(this.state.user) }
              secondary
              />
          </div>
        </Paper>
      </Col>
    </Paper>
    <Snackbar
      open={ this.state.snackOpen }
      onRequestClose={ this.handleRequestClose }
      transition={ Fade }
      message={this.props.snackbarMessage}
    />
  </div>
}

Auth.propTypes = {
  title: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
  snackbarMessage: PropTypes.string.isRequired
};
