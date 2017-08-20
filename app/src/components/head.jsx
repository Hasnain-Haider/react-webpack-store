import React, { Component } from 'react';
import { FlatButton, IconButton, IconMenu, MenuItem, MoreVertIcon, AppBar } from 'material-ui';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import history from 'lib/history';
import { Row, Col, Button, Paper, TextField, Divider } from 'react-bootstrap';
import SideBar from './sidebar';

export default class Head extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false
    };
  }


  renderIconMenu() {
    return (
      <IconMenu
        iconButtonElement={ <IconButton><ArrowDropDown /></IconButton> }
      >
        <MenuItem value={ "27" } primaryText="thisis27" />
      </IconMenu>
    );
  }

  render() {
    return (
      <AppBar
        { ...this.props }
        iconElementRight={ this.renderIconMenu() }
      />
    );
  }
}
