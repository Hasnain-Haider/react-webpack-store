import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, IndexRoute } from 'react-router-dom'
// import config from 'config';

import App from './app';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

  ReactDOM.render(
      <App />,
     document.getElementById('app'));
