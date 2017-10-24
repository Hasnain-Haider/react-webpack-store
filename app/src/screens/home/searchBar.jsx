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
      menuOpen: false,
      term: ''
    };
  }

  toggleMenu() {
    this.setState((prevState) => {
      return {
        menuOpen: !prevState.menuOpen
      };
    });
  }

  changeSearchTerm(event)  {
    this.setState({
      term: event.target.value
    });
  }

  validTerm () {
    return !this.state.term;
  }

  submit() {}

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
              onChange={ this.changeSearchTerm }
              onKeyPress={ event => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  this.submit();
                }
              }}
              />

            <IconButton disabled={ this.validTerm() } tooltip={ 'Search' } >
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
