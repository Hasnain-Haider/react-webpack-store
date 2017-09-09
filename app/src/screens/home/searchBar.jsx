// Modules
import React, { Component } from 'react';
import { Paper, TextField, IconButton } from 'material-ui';
import { Row, Col } from 'react-bootstrap';
import SearchIcon from 'material-ui/svg-icons/action/search';
import ArrowDownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowUpIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import PropTypes from 'prop-types';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
  }

  toggleMenu = () => {
    this.setState((prevState) => {
      return {
        menuOpen: !prevState.menuOpen
      };
    });
  }

  render() {
    return (
      <div style={ this.props.style }>
        <Paper
          style={ {
            padding: 10
          } }
          >
          <Row>
            <TextField
              style={{
                width: '80%'
              }}
              hintText={ 'Search' }
            />

            <IconButton tooltip={ 'Search' } >
              <SearchIcon />
            </IconButton>
            <IconButton onTouchTap={ this.toggleMenu }>
              { this.state.menuOpen ? <ArrowUpIcon /> : <ArrowDownIcon /> }
            </IconButton>
          </Row>
        </Paper>
      </div>
    )
  }
}
