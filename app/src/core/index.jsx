import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SideBar from './sidebar';
import { Snackbar } from 'material-ui';
import Head from './head';
import authRedux from 'lib/reduxes/auth';
import alertRedux from 'lib/reduxes/alert';


export default class Core extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      snackbarOpen: false,
      message: ''
    };

    alertRedux.subscribe(this.listenAlert.bind(this));
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.navigateTo = this.navigateTo.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  listenAlert() {
    const aState = alertRedux.getState();
    console.log(aState);
    if (aState !== {}) {
      this.setState({
        message: aState.message,
        snackbarOpen: aState.snack,
        dialogOpen: aState.dialog
      });
    }
  }

  navigateTo(path) {
    this.props.history.push(path);
    this.setState({
      sidebarOpen: false,
      snackbarOpen: false,
      message: ''
    });
  }

  handleRequestClose(){
    this.setState({
      snackbarOpen: false,
      message: ''
    });
  }

  toggleDrawer() {
    this.setState((prevState, props) => ({
        sidebarOpen: !prevState.sidebarOpen
    }));
  }

  render () {
    const { history, routes, children } = this.props;
    const { sidebarOpen } = this.state;
    return(
      <div>
        <Head
          title={ "Hasnains React Store" }
          stew={ this.props.stew.Head }
          onLeftIconButtonTouchTap={ this.toggleDrawer.bind(this) }
          style={ { margin: 10 } }
          navigateTo={ this.navigateTo }
        />
        { children }
        <SideBar
          onRequestChange={ sidebarOpen => this.setState({ sidebarOpen }) }
          stew={ this.props.stew.SideBar }
          open={ sidebarOpen }
          routes={ routes }
          navigateTo={ this.navigateTo }
        />
        <Snackbar
          open={ this.state.snackbarOpen }
          onRequestClose={ this.handleRequestClose }
          message={ this.state.message }
        />
      </div>
    )
  }
}
