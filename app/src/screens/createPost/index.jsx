import React, { Component } from 'react';
import { Paper, TextField, Chip, Dialog, FlatButton, RaisedButton, SelectField, MenuItem } from 'material-ui';
import { Row, Col } from 'react-bootstrap';
import categories from 'lib/categories';
import request from 'superagent';
import config from 'config';
import PropTypes from 'prop-types'
import Core from '../../components/core';
import authRedux from 'lib/reduxes/auth';
const apiUrl = `http://${config.api.host}:${config.api.port}`;
const textFields = ['title', 'description', 'imgSrc', 'price'];

export default class CreatePost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: []
    }
  }

  componentWillMount = () => console.log(window, document);

  validate = () => {  }

  submit = event => {
    for (var key in this.refs) {
      console.log(this.refs[key].getValue());
    }
  }

  renderMenuItems = () => categories.map(
    category => <MenuItem value={ category } primaryText={ category } />
  )

  selectionRenderer = vals => {
    switch (vals.length) {
      case 0:
        return 'Select Category(s)';
      case 1:
        return vals[0];
      default:
        return `${vals.length} selected`
    }}

  handleSelect = (event, index, value) => {
    this.setState({
      categories: value
    });
  }

  renderTextFields = fields =>
    fields.map(field =>
      <Row>
        <TextField
          name={ field }
          ref={ field }
          hintText={ field }
        />
      </Row>
    )

  renderForm = () =>
  <div>
    <Paper style={ {
        padding: 40,
      } }>
        { this.renderTextFields(textFields) }
      <Row>
        <SelectField
          name={ 'category' }
          ref={ 'category' }
          value={ this.state.categories }
          selectionRenderer={ this.selectionRenderer }
          onChange={ this.handleSelect }
          multiple
          >
          { this.renderMenuItems() }
        </SelectField>
      </Row>
      <Row>
        <RaisedButton primary onTouchTap={ event => { this.submit(event) } } label={ 'submit post' } />
      </Row>

    </Paper>
  </div>

  render = () =>
    <div>
      <Core history={ this.props.history } />
      <Paper zDepth={ 2 } style={ {
          textAlign: 'center',
          marginLeft: 10,
          marginRight: 10,
          height: '85%',
          padding: '10%'
        } }>
        <Row>
          <Col sm={ 0 } md={ 2 } lg={ 3 } />

          <Col md={ 8 } lg={ 6 } >
            { this.renderForm() }
          </Col>

          <Col sm={ 0 } md={ 2 } lg={ 3 } />
        </Row>
      </Paper>
    </div>

}
