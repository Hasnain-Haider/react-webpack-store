import React, { Component } from 'react';
import { Paper } from 'material-ui';
import PropTypes from 'prop-types';
import request from 'superagent';
import config from 'config';
import authRedux from 'lib/reduxes/auth';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }


  render = () =>
  <div>
    <Col md={ 8 } lg={ 6 } >
      <h1 style={ centerStyle }>Foam</h1>
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
  </div>
}
