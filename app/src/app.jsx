// Modules
import React from 'react';
import { Router, Route } from 'react-router';
import {MuiThemeProvider} from 'material-ui';
import Home from './home';

// Styles

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }
  componentWillMount(){

  }
  render() {
    return (
      <MuiThemeProvider>
        <Home />
      </MuiThemeProvider>
    );
  };
}
