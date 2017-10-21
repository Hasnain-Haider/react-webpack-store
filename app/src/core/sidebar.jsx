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

  renderLinks = () =>{
    return this.props.routes.map((link, idx) => (
        <MenuItem
          primaryText={ link.text }
          name={ link.path }
          onTouchTap={()=>this.props.navigateTo(link.path)}
        >
          <Link to={ link.path } />
        </MenuItem>
      )
    )
  }

  render = () =>
    <Drawer
      open={ this.props.open }
      width={ 210 }
      onRequestChange={ this.props.onRequestChange }
      docked={ false }
      className={ 'sidebar' }
    >
      { this.renderLinks() }
    </Drawer>
}

SideBar.propTypes = {
  onRequestChange: PropTypes.func.isRequired,
  open: PropTypes.bool
};

SideBar.defaultProps = {
  open: false
};
