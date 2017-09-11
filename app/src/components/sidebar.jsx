import React, { Component } from 'react';
import { Drawer, MenuItem, Divider } from 'material-ui';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open
    };
  }

  render = () =>
    <Drawer
      open={ this.props.open }
      width={ 210 }
      onRequestChange={ this.props.onRequestChange }
      docked={ false }
      className={ 'sidebar' }
    >
      <Link to={ "/" }>
        <MenuItem primaryText={ "Home!" } onTouchTap={ this.props.onRequestChange } />
      </Link>
      <Link to={ "signup" }>
        <MenuItem primaryText={ "SignUp!" } onTouchTap={ this.props.onRequestChange } />
      </Link>
      <Divider />
      <Link to={ "login" }>
        <MenuItem primaryText={ "Login!" } onTouchTap={ this.props.onRequestChange } />
      </Link>
    </Drawer>
}

SideBar.propTypes = {
  onRequestChange: PropTypes.func.isRequired,
  open: PropTypes.bool
};

SideBar.defaultProps = {
  open: false
};
