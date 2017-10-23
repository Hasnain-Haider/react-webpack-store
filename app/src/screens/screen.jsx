import React, { Component } from 'react';

export default class Screen extends Component {
  constructor(props) {
    super(props);
    this.stew = props.stew;
    console.log(this.stew);
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }
}
