import React, { Component } from 'react';
import { Drawer, MenuItem }  from 'material-ui';
import { Row, Col } from 'react-bootstrap';
import SideBar from './sidebar';
import Head from './head';

export default class Auth extends Component {
  constructor(props){
    super(props)
    this.state = {
      drawerOpen: false
    }
  }

  toggleDrawer() {
    this.setState( (prevState, props) => {
        return {
          drawerOpen: !prevState.drawerOpen
        }
      }
    );
  }
  render() {
    return (
      <div>
        <Head
          title={ "Hassu-Store" }
          onLeftIconButtonTouchTap={ this.toggleDrawer.bind(this) }
          />
        <SideBar
          onRequestChange={ this.toggleDrawer.bind(this) }
          open={ this.state.drawerOpen }
          />
      </div>
    );
  }
}
