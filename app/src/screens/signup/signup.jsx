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

export default class SignUp extends Screen {
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
      userCreatedSnackBarOpen: false,
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

  closeSnackbar = _ => {
    this.setState({
      userCreatedSnackBarOpen: false
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

  submit = (e) => {
    request
    .post(`${apiUrl}/api/signup`)
    .send({ user: this.state.user })
    .withCredentials()
    .end((err, res) => {
      if (err) {
        console.error(err);
      } else {
        this.setState({
          userCreatedSnackBarOpen: true
        });
      }
    });
  }

  // define state.badEmail && badUsername

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
                errorText={ this.state.badEmail }
                onChange={ this.handleChange.bind(this, 'email') }
                />
            </Row>
            <Row>

              <TextField
                placeholder={ 'Username' }
                style={ centerStyle }
                name={ 'username' }
                value={ this.state.username }
                errorText={ this.state.badUsername }
                onChange={ this.handleChange.bind(this, 'username') }
                />
            </Row>
            <Row>
              <TextField
                placeholder={ "Password" }
                errorText={this.state.badPassword}
                name={ 'password' }
                style={ centerStyle }
                value={ this.state.password }
                onChange={ this.handleChange.bind(this, 'password') }
                type={ "password" }
                />
            </Row>
            <RaisedButton
              style={ {  width : 60, ...centerStyle } }
              label={ 'login' }
              id={ 'login-btn' }
              disabled={ !this.validate() }
              onTouchTap={ this.submit }
              secondary
              />
          </div>
        </Paper>
      </Col>
    </Paper>
    <Snackbar
      open={ this.state.userCreatedSnackBarOpen }
      onRequestClose={ this.handleRequestClose }
      transition={ Fade }
      message={"hidden hills"}
      />
  </div>
}
