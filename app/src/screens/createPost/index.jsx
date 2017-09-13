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

export default class CreatePost extends Component {
  componentWillMount = () => console.log(window, document);

  validate = () => {  }

  submit = (event) => {
    console.log(event.target);
    // return request
    // .post(`${apiUrl}/signup`)
    // .withCredentials()
  }

  renderMenuItems = () => categories.map( category => <MenuItem value={ category } primaryText={ category } />)
  selectionRenderer = (vals) => {
    switch (vals.length) {
      case 0:
      return '';
      case 1:
      return vals[0];
      default:
      return `${vals.length} selected`
    }
  }
  handleSelect = (event, index, value) => {
    this.setState({
      categories: value
    });
  }

  renderForm = () =>
  <div>
    <Paper style={ {
        padding: 40,
      } }>

      <Row>
        <TextField
          name={ 'title' }
          ref={ title => this.title = title}
          />
      </Row>
      <Row>
        <TextField
          name={ 'description' }
          ref={ description => this.description = description}
          />
      </Row>
      <Row>
        <TextField
          name={ 'imgSrc' }
          ref={ imgSrc => this.imgSrc = imgSrc}
          />
      </Row>
      <Row>
        <TextField
          name={ 'price' }
          ref={ price => this.price = price}
          />
      </Row>
      <Row>
        <SelectField
          name={ 'category' }
          ref={ category => this.category = category }
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
