import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Redirect,
  Switch,
} from 'react-router-dom';
import React, { Component } from 'react';
import { MuiThemeProvider } from 'material-ui';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { toLower, entries } from 'lodash';

import authRedux from 'lib/reduxes/auth';
import screens from './screens/';
import CoreComponent from './core/';
import stew from './appStew';

require("babel-polyfill");

const Core = withRouter(CoreComponent);
const DEBUG = true;
injectTapEventPlugin();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.stew = props.stew;
  }

  createRoutes() {
    return entries(this.stew.screens).map(([sName, screenStew]) => {
      console.log(sName, `/${toLower(sName)}`);
      const user = authRedux.getState();
      const Screen = withRouter(screens[sName]);

      return (
        <Route
          path={ `/${toLower(sName)}` }
          key={ sName }
          component={ () => <Screen stew={ screenStew } /> }
        />
      );
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <Switch>
            <div>
              <Redirect exact from="/" to="/home" />
              <Route component={ () =>
                <Core stew={ this.stew.Core } />
              }
              />
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
