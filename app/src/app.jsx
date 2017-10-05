import config from 'config';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from 'material-ui';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import injectTapEventPlugin from 'react-tap-event-plugin';
import screens from './screens/';
import Page from './page';
const { Home, SignUp, Login, CreatePost } = screens;
require("babel-polyfill");

const DEBUG = true;
console.debug = (...args) => DEBUG ? console.log(...args) : null;
injectTapEventPlugin();

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('mounting home');
  }

  render = () =>
    <MuiThemeProvider>
      <Router>
        <Switch>
          <Route exact path={ '/' } component={ Home } />
          <Route exact path={ '/createPost' } component={ CreatePost } />
          <Route path={ '/signup' } component={ SignUp } />
          <Route path={ '/login' } component={ Login } />
        </Switch>
      </Router>
    </MuiThemeProvider>
}

ReactDOM.render(
  <App />,
  document.getElementById('app'));
