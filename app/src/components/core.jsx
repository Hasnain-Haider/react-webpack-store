import React, { Component } from 'react';
import SideBar from './sidebar';
import Head from './head';
import PropTypes from 'prop-types';

export default class Core extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  toggleDrawer() {
    this.setState((prevState, props) => {
      return {
        open: !prevState.open
      };
    });
  }

  render() {
    return (
      <div>
        <Head
          title={ "Hasnains React Store" }
          onLeftIconButtonTouchTap={ this.toggleDrawer.bind(this) }
          style={ this.props.headStyle }
        />
        <SideBar
          onRequestChange={ open => this.setState({ open: open }) }
          open={ this.state.open }
        />
      </div>
    );
  }
}
