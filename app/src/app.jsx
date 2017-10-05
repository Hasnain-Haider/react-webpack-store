import config from 'config';
import React from 'react';
import { MuiThemeProvider } from 'material-ui';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import injectTapEventPlugin from 'react-tap-event-plugin';
import screens from './screens/';
import Page from './page/';
import routes from './routes'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
require("babel-polyfill");

const DEBUG = true;
console.debug = (...args) => DEBUG ? console.log(...args) : null;
injectTapEventPlugin();

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  createRoutes = () => {
    return this.props.routes.map(route =>
      <Route exact path={ route.path } key={ route.path }>
        <Page children={ React.createElement(screens[route.screen]) } />
      </Route>
    );
  }

  render = () => (
    <MuiThemeProvider>
      <Router>
        <Switch>
          { this.createRoutes() }
        </Switch>
      </Router>
    </MuiThemeProvider>
  )
}

  ReactDOM.render(
    <App routes={ routes } />,
  document.getElementById('app'));
