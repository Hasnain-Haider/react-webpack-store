import React, { Component } from 'react';
import { Drawer, MenuItem }  from 'material-ui';
import { Link } from 'react-router-dom';
import history from '../../lib/history';

import { Row, Col } from 'react-bootstrap';
export default class SideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: props.open
    }
  }

  render() {
    return (
      <Drawer
        {...this.props}
        width={ 210 }
        docked={ true }
      >
        <Link to='/signup'>
          <MenuItem primaryText='SignUp!'/>
        </Link>
      </Drawer>
    );
  }
}
