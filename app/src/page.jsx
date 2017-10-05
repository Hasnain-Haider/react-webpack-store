import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SideBar from './coreComponents/sidebar';
import Head from './coreComponents/head';

export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  toggleDrawer() {
    this.setState((prevState, props) => ({
        open: !prevState.open
    }));
  }

  render = () =>
    <div>
      <Head
        title={ "Hasnains React Store" }
        onLeftIconButtonTouchTap={ this.toggleDrawer.bind(this) }
        style={ { ...this.props.headStyle, margin: 10 } }
        history={ this.props.history }
      />
      <SideBar
        onRequestChange={ open => this.setState({ open }) }
        open={ this.state.open }
        history={ this.props.history }
      />
    { this.props.children }
  </div>
}
