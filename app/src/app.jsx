import config from 'config';
import React from 'react';
import { MuiThemeProvider } from 'material-ui';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import injectTapEventPlugin from 'react-tap-event-plugin';
import screens from './screens/';
import Page from './page/';
import routes from './routes'
import _config from './conf';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  IndexRoute
} from 'react-router-dom';
require("babel-polyfill");
const DEBUG = true;
console.debug = (...args) => DEBUG ? console.log(...args) : null;
injectTapEventPlugin();
const { Home } = screens;


export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  createRoutes = () => this.props.routes.map(route => {
      const { path, screen } = route;
      const component = screens[screen];
      return(
        <Route exact path={ `/${path}` } key={ path }>
          <Page
            config={ _config[screen] }
            children={ React.createElement(component, { config: _config[screen] }) } 
            />
        </Route>
      );
    }
  );

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
