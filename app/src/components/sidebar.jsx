import React, { Component } from 'react';
import { Drawer, MenuItem, Divider } from 'material-ui';
import { Link } from 'react-router-dom';

export default class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: props.open
    };

    console.log('popin', props.open);
  }

  render() {
    return (
      <Drawer
        open={ this.props.open }
        width={ 210 }
        onRequestChange={ this.props.onRequestChange }
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
