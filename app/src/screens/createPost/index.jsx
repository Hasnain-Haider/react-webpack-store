import React, { Component } from 'react';
import { Paper, TextField, Chip, Dialog, FlatButton, RaisedButton } from 'material-ui';
import { Row, Col } from 'react-bootstrap';
import Core from '../../components/core';


export default class CreatePost extends Component {
  render = () =>
    <div style={ { margin: 10 } }>
      <Core history={ this.props.history } />
      <Paper>
        <Row>
          <TextField>

          </TextField>
          <FlatButton label='emm' secondary />
        </Row>
      </Paper>
    </div>
}
