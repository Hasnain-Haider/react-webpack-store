import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SideBar from './sidebar';
import {
  Snackbar,
  FlatButton,
  Dialog
} from 'material-ui';
import Head from './head';
import authRedux from 'lib/reduxes/auth';
import alertRedux from 'lib/reduxes/alert';

export default class Core extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      snackbarOpen: false,
      dialogOpen: false,
      message: ''
    };

    alertRedux.subscribe(this.listenAlert.bind(this));
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.navigateTo = this.navigateTo.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  listenAlert() {
    const aState = alertRedux.getState();
    console.log(aState);
    if (aState !== {}) {
      this.setState({
        message: aState.message,
        snackbarOpen: aState.snack || false,
        dialogOpen: aState.dialog || false
      });
    }
  }

  navigateTo(path) {
    this.setState({
      sidebarOpen: false,
      snackbarOpen: false,
      message: ''
    });
    this.props.history.push(path);
  }

  closeSnackbar() {
    this.setState({
      snackbarOpen: false,
      message: ''
    });
  }

  toggleDrawer() {
    this.setState(prevState => ({
      sidebarOpen: !prevState.sidebarOpen
    }));
  }

  closeDialog() {
    this.setState({
      dialogOpen: false
    });
  }

  renderDialog() {
    const aState = alertRedux.getState();
    const actions = [
      <FlatButton
        label={ 'OK' }
        primary
        onClick={ this.closeDialog }
      />
    ];
    return (
      <Dialog
        actions={ actions }
        modal={false}
        open={ this.state.dialogOpen }
        onRequestClose={ this.closeDialog }
      >
        <span style={ {
          fontWeight: 'bold',
          size: 16,
          textAlign: 'center',
          color: 'blue'
        } }>
          { aState.message }
        </span>
      </Dialog>
    );
  }


  render() {
    const { children, stew } = this.props;
    return (
      <div>
        <Head
          title={ "Hasnains React Store" }
          stew={ stew.Head }
          onLeftIconButtonTouchTap={ this.toggleDrawer }
          style={ { margin: 10 } }
          navigateTo={ this.navigateTo }
        />
        { children }
        <SideBar
          onRequestChange={ sidebarOpen => this.setState({ sidebarOpen }) }
          stew={ stew.SideBar }
          open={ this.state.sidebarOpen }
          navigateTo={ this.navigateTo }
        />
        <Snackbar
          open={ this.state.snackbarOpen }
          onRequestClose={ this.closeSnackbar }
          message={ this.state.message }
        />
        { this.renderDialog() }
      </div>
    );
  }
}

Core.propTypes = {
  stew: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  children: PropTypes.func
}
