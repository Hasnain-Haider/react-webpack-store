// Modules
import React, { Component } from 'react';
import { Paper, TextField, RaisedButton, CircularProgress } from 'material-ui';
import { Col, Row } from 'react-bootstrap';
import request from 'superagent';
import config from 'config';
import authRedux from '../../lib/reduxes/auth';
import PropTypes from 'prop-types';

const apiUrl = `http://${config.api.host}:${config.api.port}/api`;

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

  validUsername = () => this.state.username.length;
  validPassword = () => this.state.password.length >= 3;
  validValues   = () => this.validUsername() && this.validPassword();

  handleChangeUser = (e) => {
    this.setState({
      username: e.target.value,
      submitOk: this.validValues()
    });
  }

  handleChangePassword = async (e) => {
    await this.setStateAsync({ password: e.target.value });
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
    console.log({loginBody});
    request
    .post(`${apiUrl}/login`)
    .send(loginBody)
    .withCredentials()
    .end((err, res) => {
      if (err) {
        console.error('therewas an error    ,', err);
      } else {
        authRedux.dispatch({
          type: 'LOGIN',
          user: res.body
        });
        this.props.history.push('/');
        console.debug('redux ', authRedux.getState());
      }
    });
  }

  renderLoginForm = () => {
    return (
      <div />
    );
  }

  render = () =>
    <div>
      <Paper zDepth={ 2 } style={ {
        textAlign: 'center',
        marginLeft: 10,
        marginRight: 10,
        height: '85%',
        padding: '10%'
       } }>
        <Row>
          <Col sm={ 0 } md={ 2 } lg={ 3 } />
          <Col md={ 8 } lg={ 6 } >
            <Paper style={ {
                padding: 20
              } }
              >
              <div>
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
                style={ {  width : 60, ...centerStyle } }
                label={ 'login' }
                disabled={ !this.state.submitOk }
                onTouchTap={ this.submit }
                secondary
              />
              </div>
            </Paper>
          </Col>
          <Col sm={ 0 } md={ 2 } lg={ 3 } />
        </Row>
      </Paper>
    </div>
}
