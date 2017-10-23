import React, { Component } from 'react';
import authRedux from 'lib/reduxes/auth';

export default class Screen extends Component {
  constructor(props) {
    super(props);
    this.stew = props.stew;
  }

  isSignedIn() {
    return authRedux.getState() !== {};
  }

  getUser(){
    return authRedux.getState();
  }

  navigateTo(dest) {
    return this.props.history.push(dest);
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }
}

Screen.propTypes = {

};
