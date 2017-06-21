import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, IndexRoute } from 'react-router-dom'
import App from './app.jsx';
import config from 'config';

// import injectTapEventPlugin from 'react-tap-event-plugin';

// injectTapEventPlugin();
import 'react-hot-loader/patch';

  ReactDOM.render(

    <Router >
      <Route component={ App }></Route>
    </Router>,
     document.getElementById('app'));
