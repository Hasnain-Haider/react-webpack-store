import React, { Component } from 'react';
import { Drawer, MenuItem, Divider } from 'material-ui';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import sideLinks from './links.json';


export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open
    };
    console.log(sideLinks);
  }

  renderLinks = () =>
    sideLinks.map((link, idx) =>
      <Link to={link.destination} key={ idx }>
        <MenuItem
          primaryText={ link.text}
          onTouchTap={ this.props.onRequestChange }
        />
      </Link>
    )

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
