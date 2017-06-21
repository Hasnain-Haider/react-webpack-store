import React from 'react';
// import AppBar from 'material-ui/AppBar';
// import IconButton from 'material-ui/IconButton';
// import IconMenu from 'material-ui/IconMenu';
// import MenuItem from 'material-ui/MenuItem';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {FlatButton, IconButton, IconMenu, MenuItem, MoreVertIcon, AppBar, ArrowDropDown } from 'material-ui';

/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
class StoreAppBar extends React.Component {

constructor(props){
  super(props)

  this.state = { drawerOpen: false }
}

toggleDrawer () {this.setState({drawerOpen:  !this.state.drawerOpen });}

renderDrawer(){

}


  render() {
    return (
      <div id="app-bar">
        <AppBar
          title="Best-Store"
          onLeftIconButtonTouchTap={this.toggleDrawer()}
          iconElementRight={ <FlatButton label={"An action"}></FlatButton> }
        />
      </div>
    );
  }
}

export default StoreAppBar;
