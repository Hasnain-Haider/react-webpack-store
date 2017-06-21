// Modules
import React from 'react';
import { Router, Route } from 'react-router';
import MuiThemeProvider  from 'material-ui';
import { Row, Col, Button, Paper, TextField, Divider } from 'react-bootstrap';
// Styles
import Head from './head.jsx';
export default class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Head></Head>
        <Col sm={6} md={4} lg={3}>
          {"One column over here esaifmndsljkfsdkjf Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
        </Col>
        <Col sm={6} md={4} lg={3}>
          {"One column over her,29843094320473etur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
        </Col>
        <Col sm={6} md={4} lg={3}>
          {"====================================occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
        </Col>

      </div>
    );
  };
}
