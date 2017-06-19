import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom'
import App from './app.jsx';
// import injectTapEventPlugin from 'react-tap-event-plugin';

// injectTapEventPlugin();

  ReactDOM.render(
    <Router >
      <Route path='/' component={ App }></Route>
    </Router>,
    document.getElementById('app')
  );
