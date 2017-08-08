import React, { Component } from 'react';
import { Drawer, MenuItem }  from 'material-ui';
import { Row, Col } from 'react-bootstrap';
import Auth from './auth';
export default class SideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: props.open
    }
  }

componentWillReceiveProps() {}

  render() {
    return (
      <Drawer
        {...this.props}
        open={this.props.open}
        width={ 210 }
        docked={ true }
      >
        <MenuItem onTouchTap={ this.props.onRequestChange } primaryText={"Login/Logout!"} />
      </Drawer>
    );
  }
}
