import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SideBar from './sidebar';
import Head from './head';

export default class Core extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.navigateTo = this.navigateTo.bind(this);
  }

  navigateTo(path) {
    this.props.history.push(path);
    this.setState({
      open: false
    });
  }

  toggleDrawer() {
    this.setState((prevState, props) => ({
        open: !prevState.open
    }));
  }

  render = () => {
    const { history, routes, children } = this.props;
    const { open } = this.state;
    return(
      <div>
        <Head
          title={ "Hasnains React Store" }
          onLeftIconButtonTouchTap={ this.toggleDrawer.bind(this) }
          style={ { margin: 10 } }
        />
        { children }
        <SideBar
          onRequestChange={ open => this.setState({ open }) }
          open={ open }
          routes={ routes }
          navigateTo={ this.navigateTo }
        />
      </div>
    )}
}
