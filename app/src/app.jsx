import config from 'config';
import React, { Component } from 'react';
import { MuiThemeProvider } from 'material-ui';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import screens from './screens/';
import Core from './core/';
import stew from './appStew';
import { toLower, each, keys } from 'lodash';
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Redirect,
  Switch,
} from 'react-router-dom';
require("babel-polyfill");

const Corex = withRouter(Core);
const DEBUG = true;
console.debug = (...args) => DEBUG ? console.log(...args) : null;
injectTapEventPlugin();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.stew = props.stew;
  }

  createRoutes() {
    return keys(this.stew.screens).map(sName => {
    const Screen = withRouter(screens[sName]);
    console.log(sName, `/${toLower(sName)}`);
    return(
      <Route
        path={ `/${toLower(sName)}` }
        key={ sName }
        component={ () => <Screen stew={ this.stew.screens[sName] } /> }
      />
    );
  });
}

  render () {
    return(
      <MuiThemeProvider>
        <Router>
          <Switch>
            <div>
              <Redirect exact from='/' to='/home'/>
              <Route component={ () =>
                  <Corex stew={ this.stew.Core } />
                } />
                { this.createRoutes() }
              </div>
            </Switch>
          </Router>
        </MuiThemeProvider>
      );
    }
  }

  ReactDOM.render(
    <App stew={ stew } />,
  document.getElementById('app'));
