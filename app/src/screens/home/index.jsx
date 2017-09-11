import React, { Component } from 'react';
import { Paper, TextField, Chip, Dialog, Divider, IconButton, GridList, GridTile } from 'material-ui';
import { Row, Col } from 'react-bootstrap';
import Core from '../../components/core';
import SearchBar from './searchBar';
import history from '../../../lib/history';
import Post from './post';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

componentWillMount () {
  this.setState({
    posts:  [{
      title: 'sample title',
      description: 'Hello there this is a great subtitle',
      text: 'The text is great tho',
      price: 41
    }]
  });
}

  renderPosts = () => {
    return this.state.posts.map((post, idx) => {
      return(
        <Paper key={ idx } style={ { margin: 10 } }>
          <Post
            title={ post.title }
            description={ post.description }
            text={ post.text }
            price={ post.price }
          />
        </Paper>
      )
    })
  }

  render () {
    return (
      <div>
        <Core history={ this.props.history } />
        <SearchBar style={ { textAlign: 'center', margin: 10 } } />
        { this.renderPosts() }
      </div>
    );
  }
}
