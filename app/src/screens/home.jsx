// Modules
import React from 'react';
import { Paper }  from 'material-ui';
import { Row, Col, Button, TextField, Divider } from 'react-bootstrap';
// Styles
// import Head from '../head';
import Core from '../components/core';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Core />
        <Paper zDepth={ 4 }>
          <Col sm={6} md={4} lg={3}>
            {"One labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitationis nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
          </Col>
          <Col sm={6} md={4} lg={ 3 }>
            {"THI IS CLOMUN 2."}
          </Col>
          <Col sm={6} md={4} lg={3}>
            {"If this works...."}
          </Col>
        </Paper>
      </div>
    );
  };
}
