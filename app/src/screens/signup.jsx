import React, { Component } from 'react';
import { Paper, TextField, RaisedButton, CircularProgress } from 'material-ui';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';

import request from 'superagent';
import config from 'config';
import authRedux from 'lib/reduxes/auth';
const apiUrl = `http://${config.api.host}:${config.api.port}`;
const centerStyle = {
  margin: "3%",
  textAlign: 'center'
}
export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
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
      </Paper>
    </div>
}
