// Modules
import React, { Component } from 'react';
import { Paper, TextField, RaisedButton } from 'material-ui';
import { Col, Row } from 'react-bootstrap';
import Core from '../components/core';
import request from 'superagent';
import config from 'config';
const apiUrl = `http://${config.api.host}:${config.api.port}`;

const centerStyle = {
  margin: 'auto',
  margin: 20,
}

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      submitOk: false,
      loading: false
    }
  }

  validUsername = () => {
    return this.state.username.length;
  }

  validPassword = () => { return this.state.password.length >= 3 }

  validValues   = () => { return this.validUsername() && this.validPassword() }

  handleChangeUser = (e) => {
    this.setState({
      username: e.target.value,
      submitOk: this.validValues()
    });
  }

  handleChangePassword = async (e) => {
    await this.setStateAsync({password: e.target.value });
    this.setState({ submitOk: this.validValues() });
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  submit = (event) => {

    const loginBody = {
      username: this.state.username,
      password: this.state.password
    };
    console.log('hit submit ', loginBody);

    request
    .post(`${apiUrl}/login`)
    // .set('Access-Control-Allow-Origin', '*')
    // .set('Content-Type','text/javascript')
    .set('WWW-Authenticate', 'Basic')
    .send(loginBody)
    .withCredentials()
    .end((err, res) => {
      if (err) {
        console.error('therewas an error    ,', err, 'res ', res);
      } else {
        console.log('login res , ', res);
      }
    });

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
                  justifyContents: 'center',
                  alignSelf: 'center'
                } }
                >
                <Row>
                  <TextField
                    hintText={ 'Username' }
                    style={ centerStyle }
                    value={ this.state.username }
                    onChange={ this.handleChangeUser }
                    />
                </Row>
                <Row>
                  <TextField
                    style={ centerStyle }
                    hintText={ "Password" }
                    type={ "password" }
                    onChange={ this.handleChangePassword }
                    value={ this.state.password }
                    />
                </Row>
                <RaisedButton
                  style={ Object.assign( { width : 60 }, centerStyle) }
                  label={ 'login' }
                  disabled={ !this.state.submitOk }
                  onTouchTap={ this.submit }
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
