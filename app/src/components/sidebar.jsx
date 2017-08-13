import React, { Component } from 'react';
import { Drawer, MenuItem, Divider } from 'material-ui';
import { Link } from 'react-router-dom';
import history from '../../lib/history';

import { Row, Col } from 'react-bootstrap';

export default class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: props.open
    };
  }

  componentDidMount() {
    console.log('SideBar state!', this.state);
    console.log('SideBar props!    <', this.props, '>');
  }

  render() {
    return (
      <Drawer
        { ...this.props }
        width={ 210 }
        docked={ false }
      >
        <Link to={ "/signup" }>
          <MenuItem primaryText={ "SignUp!" } onTouchTap={ this.props.onRequestChange } />
        </Link>
        <Divider />
        <Link to={ "login" }>
          <MenuItem primaryText={ "Login!" } onTouchTap={ this.props.onRequestChange } />
        </Link>
      </Drawer>
    );
  }
}
