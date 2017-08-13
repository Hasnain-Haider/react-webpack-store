import React, { Component } from 'react';
import { Drawer, MenuItem, Divider }  from 'material-ui';
import { Link } from 'react-router-dom';
import history from '../../lib/history';

import { Row, Col } from 'react-bootstrap';
export default class SideBar extends Component {
  constructor(props) {
    super(props)
    console.log('SideBar mounted with', props);
    this.state = {
      open: props.open
    }
  }

  componentDidMount() {
    // console.log('SideBar props!', console.log(this.props));
    console.log('SideBar state!', console.log(this.state));
  }

  render() {
    console.log('SideBar props!    <', console.log(this.props), '>');
    return (
      <Drawer
        { ...this.props }

        width={ 210 }
        docked={ false }
      >
        <Link to='/signup'>
          <MenuItem primaryText='SignUp!' onTouchTap={ this.props.onRequestChange } />
        </Link>
      </Drawer>
    );
  }
}
