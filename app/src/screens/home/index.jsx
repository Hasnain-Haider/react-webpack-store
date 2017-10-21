import React, { Component } from 'react';
import { Paper, TextField, Chip, Dialog, Divider, IconButton, GridList, GridTile } from 'material-ui';
import { Row, Col } from 'react-bootstrap';
import request from 'superagent';
import config from 'config'
import SearchBar from './searchBar';
import Post from './post';
import authRedux from 'lib/reduxes/auth';
const apiUrl = `http://${config.api.host}:${config.api.port}/api`;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }

  componentWillUnmount() {
    this.setState({
      posts: []
    });
  }

  componentWillMount = async () => {
    var posts = await this.fetchPosts();
    this.setState({ posts });
  }

  fetchPosts = async () => {
    var postings = await request
    .get(`${apiUrl}/post?limit=5&skip=0`)
    .withCredentials()
    return postings.body;
  }

  renderPosts = () => {
    return this.state.posts.map((post, idx) => (
        <Col sm={ 12 } md={ 6 } lg={ 4 } key={ idx }>
        <Paper key={ idx } style={ { margin: 10 } }>
          <Post
            title={ post.title }
            imgSrc={ post.imgSrc }
            description={ post.description }
            text={ post.text }
            price={ post.price }
          />
        </Paper>
      </Col>
    ));
  }

  render () {
    return (
      <div>
        <SearchBar style={ { textAlign: 'center', margin: 10 } } />
        <Row>
          { this.renderPosts() }
        </Row>
      </div>
    );
  }
}
