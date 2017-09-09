// Modules
import React, { Component } from 'react';
import { Paper, TextField, Card, Chip, Dialog, Divider, IconButton } from 'material-ui';
import { Row, Col } from 'react-bootstrap';
import SearchIcon from 'material-ui/svg-icons/action/search';
import ArrowDownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowUpIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up';

// Styles
// import Head from '../head';
import Core from '../../components/core';
import SearchBar from './searchBar';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Core
          headStyle={ {
              marginBottom: 20
            }}
           />
         <SearchBar style={{ textAlign: 'center' }} />
      </div>
    )
  }
}
