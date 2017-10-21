import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SideBar from './sidebar';
import Head from './head';

export default class Core extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.config = props.config;
  }

  toggleDrawer() {
    this.setState((prevState, props) => ({
        open: !prevState.open
    }) );
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.children);
  }


  render = () => (
    <div>
      <Head
        title={ "Hasnains React Store" }
        onLeftIconButtonTouchTap={ this.toggleDrawer.bind(this) }
        style={ { margin: 10 } }
        history={ this.props.history }
      />
      <SideBar
        onRequestChange={ open => this.setState({ open }) }
        open={ this.state.open }
        history={ this.props.history }
      />
    { this.props.children }
  </div>
);
}