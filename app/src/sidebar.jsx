import React from 'react';
import { Router, Route } from 'react-router';
import {MuiThemeProvider, Drawer, Paper, TextField, Divider }  from 'material-ui';
import { Row, Col} from 'react-bootstrap';
export default class App extends React.Component {

  constructor(props) {
    super(props);
  }
  componentWillMount(){

  }
  render() {
    return (
      <Drawer
        width={210}
        docked={true}
        >

      </Drawer>

    );
  };
}
