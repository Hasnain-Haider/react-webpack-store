// Modules
import React, { Component } from 'react';
import { Paper, TextField, RaisedButton } from 'material-ui';
import { Col, Row } from 'react-bootstrap';
import Core from '../components/core';

const centerStyle = {
  margin: 'auto',
  display: 'block',
  margin: 20
}

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      submitDisabled: true
    }
  }

  validUsername = () => {

  }

  validPassword() {
    return this.state.password.length >= 6;
  }

  validValues() {
    return this.validUsername() && this.validPassword()
  }

  handleChange = (e) => {
    console.log(e.target);
  }

  render() {
    return (
      <div>
        <Core />
        <Paper zDepth={ 2 }>
          <Row>
            <Col sm={ 0 } md={ 2 } lg={ 3 } />
            <Col md={ 8 } lg={ 6 } >
              <Paper style={ {
                  margin: 40,
                  padding: 40,
                } }
              >

                  <Row>
                    <TextField
                      hintText={ 'Username' }
                      errorText={ 'Enter a valid Username' }
                      style={ centerStyle }
                      value={ this.state.username }
                      onChange={ this.handleChange }
                    />
                  </Row>
                  <Row>
                    <TextField
                      style={ centerStyle }
                      hintText={ "Password" }
                      type={ "password" }
                      value={ this.state.password }
                    />
                  </Row>
                  <RaisedButton
                    style={ Object.assign( { width : 60 }, centerStyle) }
                    label={ 'login' }
                    disabled={ this.state.submitDisabled }
                    secondary
                   />
                </Paper>
              </Col>
              <Col sm={ 0 } md={ 2 } lg={ 3 } />
            </Row>
          </Paper>
        </div>
      );
    }
  }
