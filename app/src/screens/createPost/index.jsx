import React from 'react';
import {
  Paper,
  TextField,
  RaisedButton,
  SelectField,
  MenuItem
} from 'material-ui';
import { Row, Col } from 'react-bootstrap';
import request from 'superagent';
import PropTypes from 'prop-types';

import authRedux from 'lib/reduxes/auth';
import Screen from '../screen';

export default class CreatePost extends Screen {
  constructor(props) {
    super(props);

    this.state = {
      categories: []
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  validate() {
    for (const key in fields) {

    }
  }

  submit(event, cb) {
    const body = {};
    Object.keys(this.refs).forEach((key) => {
      body[key] = this.refs[key].getValue();
    });
    console.log({
      ...body,
      owner: this.getUser()._id,
      created: Date.now()
    });
    request
      .post(`${apiUrl}/post`)
      .send({
        ...body,
        owner: authRedux.getState()._id,
        created: Date.now()
      })
      .end((err, res) => {
        if (err) {
          console.error(err);
        } else {
          console.log({ res });
          this.props.history.push('/account');
        }
        if (cb) {
          cb(res);
        }
      });
  }

  selectionRenderer(vals) {
    switch (vals.length) {
    case 0:
      return 'Select Category(s)';
    case 1:
      return vals[0];
    default:
      return `${vals.length} selected`;
    }
  }

  handleSelect(event, index, value) {
    console.log(value, index);
    this.setState({
      categories: value
    });
  }

  renderTextFields(fields) {
    return fields.map(field => (
      <Row>
        <TextField
          name={ field }
          ref={ field }
          hintText={ field }
        />
      </Row>
    ));
  }

  renderMenuItems(categories) {
    return categories.map(x => <MenuItem >{ x }</MenuItem>);
  }

  renderForm() {
    return (
      <div>
        <Paper style={ {
          padding: 40,
        } }
        >
          { this.renderTextFields(this.stew.textFields) }
          <Row>
            <SelectField
              name={ 'category' }
              value={ this.state.categories }
              selectionRenderer={ this.selectionRenderer }
              onChange={ this.handleSelect }
              multiple
            >
              { this.renderMenuItems(this.stew.categories) }
            </SelectField>
          </Row>
          <Row>
            <RaisedButton primary onTouchTap={ (event) => { this.submit(event); } } label={ 'submit post' } />
          </Row>
        </Paper>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Paper
          zDepth={ 2 }
          style={ {
            textAlign: 'center',
            marginLeft: 10,
            marginRight: 10,
            height: '85%',
            padding: '10%'
          } }
        >
          <Row>
            <Col sm={ 0 } md={ 2 } lg={ 3 } />
            <Col md={ 8 } lg={ 6 } >
              { this.renderForm() }
            </Col>
            <Col sm={ 0 } md={ 2 } lg={ 3 } />
          </Row>
        </Paper>
      </div>
    );
  }
}
