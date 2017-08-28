import React, { Component } from 'react';
import { FlatButton, IconButton, IconMenu, MenuItem, MoreVertIcon, AppBar } from 'material-ui';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';

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
        title={ this.props.title }
        onLeftIconButtonTouchTap={ this.props.onLeftIconButtonTouchTap }
        iconElementRight={ this.renderIconMenu() }
      />
    );
  }
}
