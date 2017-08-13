// Modules
import config from 'config';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from 'material-ui';

import history from '../lib/history';
import Home from './screens/home';
import SignUp from './screens/signup';
import Login from './screens/login';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  render() {
    return (
      <MuiThemeProvider>
        <Router history={ history }>
          <Switch>
            <Route exact path={ '/' } component={ Home } />
            <Route path={ '/signup' } component={ SignUp } />
            <Route path={ '/login' } component={ Login } />
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}
