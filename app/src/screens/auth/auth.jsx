// Modules
import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import request from 'superagent';
import PropTypes from 'prop-types';
import config from 'config';
import { every } from 'lodash';
import authRedux from 'lib/reduxes/auth';
import Screen from '../screen';
import {
  Paper,
  TextField,
  FlatButton,
  RaisedButton,
  Snackbar,
  CircularProgress
} from 'material-ui';

const apiUrl = `http://${config.api.host}:${config.api.port}/api`;

const centerStyle = {
  margin: 'auto',
  margin: 20,
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
      user,
      submitOk: false,
      loading: false,
      snackBarOpen: false
    }
  }
  handleChange (fieldName, event) {
    const user = {
      ...this.state.user,
      [fieldName]: event.target.value
    }
    this.setState({ user });
  }

  submit () {
    const { username, password, email } = this.state.user;
    const user = { username, password, email };
    this.props.submit(user)
  }

  validate () {
    const { email, password, username } = this.state.user;
    try {
      return every([email, password, username], x => x.length > 4);
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  renderForm () {

    return(
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
          label={ this.props.btnLabel }
          className={ 'btn' }
          disabled={ !this.validate() }
          onTouchTap={ this.submit }
          secondary
          />
      </div>
    )
  }


  render(){
    return (
        <div>
        <Paper>
          <Col md={ 8 } lg={ 6 } style={{ padding: "10%"}}>
            <h1 style={ centerStyle }>{ this.props.hTitle }</h1>
            <Paper style={ {
                padding: "10%",
                ...centerStyle
              } }
              >
              {this.renderForm()}
            </Paper>
          </Col>
        </Paper>
        <Snackbar
          open={ this.state.snackBarOpen }
          onRequestClose={ this.handleRequestClose }
          transition={ Fade }
          message={ this.props.snackbarMsg }
        />
      </div>
  )
}
}
