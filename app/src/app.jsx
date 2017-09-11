// Modules
import config from 'config';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from 'material-ui';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Home from './screens/home/';
import SignUp from './screens/signup';
import Login from './screens/login';
import CreatePost from './screens/createPost/'
require("babel-polyfill");

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
      <Router history={ createBrowserHistory() }>
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
