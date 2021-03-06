// Modules
import {
  Paper,
  TextField,
  FlatButton,
  RaisedButton,
  CircularProgress
} from 'material-ui';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { every } from 'lodash';
import PropTypes from 'prop-types';
import authRedux from 'lib/reduxes/auth';
import Screen from '../screen';
import 'styles/auth';

export default class Auth extends Screen {
  constructor(props) {
    super(props);
    const user = {
      email: '',
      password: '',
      username: ''
    };
    this.state = {
      user,
      submitOk: false,
      loading: false,
    };
    this.submit = this.submit.bind(this);
  }

  handleChange(fieldName, event) {
    const user = {
      ...this.state.user,
      [fieldName]: event.target.value
    };
    this.setState({ user });
  }

  submit() {
    const { username, password, email } = this.state.user;
    const user = { username, password, email };
    this.props.submit(user);
  }

  validate() {
    const { email, password, username } = this.state.user;
    try {
      return every([email, password, username], x => x.length >= 3);
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  renderForm() {
    return (
      <div id={ 'auth' } style={ { margin: 'auto' } }>
        <Row>
          <TextField
            placeholder={ 'Email' }
            className={ 'center' }
            name={ 'email' }
            value={ this.state.email }
            id={ 'email-field' }
            errorText={ this.state.badEmail }
            onChange={ this.handleChange.bind(this, 'email') }
          />
        </Row>
        <Row>
          <TextField
            className={ 'center' }
            placeholder={ 'Username' }
            name={ 'username' }
            value={ this.state.username }
            id={ 'user-field' }
            errorText={ this.state.badUsername }
            onChange={ this.handleChange.bind(this, 'username') }
          />
        </Row>
        <Row>
          <TextField
            className={ 'center' }
            placeholder={ "Password" }
            errorText={ this.state.badPassword }
            name={ 'password' }
            value={ this.state.password }
            id={ 'pass-field' }
            onChange={ this.handleChange.bind(this, 'password') }
            type={ "password" }
          />
        </Row>
        <RaisedButton
          label={ this.props.btnLabel }
          id={ 'submit-btn' }
          className={ 'center' }
          disabled={ !this.validate() }
          onTouchTap={ this.submit }
          secondary
        />
      </div>
    );
  }


  render() {
    return (
      <div>
        <Paper>
          <Col md={ 8 } lg={ 6 } style={ { padding: "10%" } }>
            <h1 className={ 'center' }>{ this.props.hTitle }</h1>
            <Paper
              style={ {
                padding: "10%",
              } }
              className={ 'center' }
            >
              {this.renderForm()}
            </Paper>
          </Col>
        </Paper>
      </div>
    );
  }
}

Auth.propTypes = {

};
