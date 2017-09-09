import React, { Component } from 'react';
import { IconButton, IconMenu, MenuItem, AppBar } from 'material-ui';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import PropTypes from 'prop-types';

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
        style={ this.props.style }
        onLeftIconButtonTouchTap={ this.props.onLeftIconButtonTouchTap }
        iconElementRight={ this.renderIconMenu() }
      />
    );
  }
}

Head.propTypes = {
  title: PropTypes.string.isRequired,
  onLeftIconButtonTouchTap: PropTypes.func.isRequired
};
