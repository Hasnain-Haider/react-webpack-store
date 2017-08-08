// Modules
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import history from '../lib/history';
import { MuiThemeProvider } from 'material-ui';
import Home from './home';
import SignUp from './signup';
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
        <Router history={ history }>
          <Route exact path='/' component={ Home } />
          <Route path='/signup' component={ SignUp }/>
        </Router>
    </MuiThemeProvider>
    );
  }
}
