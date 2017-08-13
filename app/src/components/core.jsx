import React, { Component } from 'react';
import { Drawer, MenuItem }  from 'material-ui';
import SideBar from './sidebar';
import Head from './head';

export default class Core extends Component {
  constructor(props){
    super(props)
    this.state = {
      open: false
    }
  }

  toggleDrawer() {
    this.setState((prevState, props) => {
        return {
          open: !prevState.open
        };
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
          onRequestChange={ (open) => this.setState({ open: open }) }
          open={ this.state.open }
          />
      </div>
    );
  }
}
