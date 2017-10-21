import config from 'config';
import React, { Component } from 'react';
import { MuiThemeProvider } from 'material-ui';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import screens from './screens/';
import Core from './core/';
import routes from './routes'
import _config from './conf';
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Switch,
} from 'react-router-dom';
const Corex = withRouter(Core);
require("babel-polyfill");

const DEBUG = true;
console.debug = (...args) => DEBUG ? console.log(...args) : null;
injectTapEventPlugin();

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  createRoutes = () => routes.map(route => {
    const { path, screen } = route;
    const Screen = screens[screen];
    return(
      <Route
        path={ path }
        key={ screen }
        component={ () => <Screen /> }
      />
    );
  });

  render = () => (
    <MuiThemeProvider>
      <Router>
        <Switch>

          <div>
            <div>
              <Route component={ () =>
                  <Corex routes={ routes } />
                 } />
            </div>
            { this.createRoutes() }
          </div>

        </Switch>
      </Router>
    </MuiThemeProvider>
  )
}

  ReactDOM.render(
    <App />,
  document.getElementById('app'));
