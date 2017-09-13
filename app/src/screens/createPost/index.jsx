import React, { Component } from 'react';
import { Paper, TextField, Chip, Dialog, FlatButton, RaisedButton, SelectField, MenuItem } from 'material-ui';
import { Row, Col } from 'react-bootstrap';
import Core from '../../components/core';
import categories from 'lib/categories';

export default class CreatePost extends Component {
  componentWillMount = () => console.log(window, document);

  validate = () => {  }

  renderMenuItems = () =>
      <div>
      </div>

  renderForm = () =>
  <div>
    <Paper style={ {
      margin: 40,
      padding: 40,
    } }>
      <form
        onSubmit={ (event) => {
          event.preventDefault();
          console.log(event.target.title.value)
        } }
      >

        <Row>
          <TextField
            name={ 'title' }
          />
        </Row>
        <Row>
          <TextField
            name={ 'description' }
          />
        </Row>
        <Row>
          <TextField
            name={ 'imgSrc' }
          />
        </Row>
        <Row>
          <TextField
            name={ 'price' }
          />
        </Row>
        <Row>
          <SelectField
            name={ 'category' }
          >
            { categories.map( category => <MenuItem value={ category } primaryText={ category } /> ) }
          </SelectField>
        </Row>
        <Row>
          <RaisedButton primary onTouchTap={ () => {} } label={ 'submit post' } />
        </Row>
      </form>
    </Paper>
  </div>

  render = () =>
  <div>
    <Core history={ this.props.history } />
    <Paper zDepth={ 2 } style={ {
        textAlign: 'center',
        margin: 10
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
