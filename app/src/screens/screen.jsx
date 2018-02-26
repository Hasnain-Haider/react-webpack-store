import React, { Component } from 'react';
import authRedux from 'lib/reduxes/auth';
import alertRedux from 'lib/reduxes/alert';

export default class Screen extends Component {
  constructor(props) {
    super(props);
    this.stew = props.stew;
  }

  static isSignedIn() {
    return authRedux.getState() !== {};
  }

  static getUser() {
    return authRedux.getState();
  }

  static dispatchAlert(type, message) {
    alertRedux.dispatch({ type, message });
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  navigateTo(dest) {
    return this.props.history.push(dest);
  }
}

Screen.propTypes = {

};
