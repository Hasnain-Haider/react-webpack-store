import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
// import config from 'config';

import App from './app';


injectTapEventPlugin();

  ReactDOM.render(
      <App />,
     document.getElementById('app'));
