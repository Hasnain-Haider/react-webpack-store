import React, { Component } from 'react';
// import AppBar from 'material-ui/AppBar';
// import IconButton from 'material-ui/IconButton';
// import IconMenu from 'material-ui/IconMenu';
// import MenuItem from 'material-ui/MenuItem';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {FlatButton, IconButton, IconMenu, MenuItem, MoreVertIcon, AppBar } from 'material-ui';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import { Row, Col, Button, Paper, TextField, Divider } from 'react-bootstrap';
import SideBar from './sidebar';
/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
export default class Head extends Component {
  constructor(props){
    super(props)
    this.state = {
      drawerOpen: false
    }
  }


  renderIconMenu() {
    return(
    <IconMenu
      iconButtonElement={ <IconButton><ArrowDropDown /></IconButton> }
    >
      <MenuItem value={ "27" } primaryText="thisis27"></MenuItem>
    </IconMenu>
    )
  }

  render() {
    return (
        <AppBar
          {...this.props}
          iconElementRight={ this.renderIconMenu() }
        />
    );
  }
}
