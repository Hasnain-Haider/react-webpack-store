import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, IndexRoute } from 'react-router-dom'
import config from 'config';

import App from './app.jsx';

// import injectTapEventPlugin from 'react-tap-event-plugin';

// injectTapEventPlugin();

  ReactDOM.render(

    <Router >

      <App></App>
    </Router>,
     document.getElementById('app'));
