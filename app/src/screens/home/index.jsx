import React, { Component } from 'react';
import { Paper, TextField, Chip, Dialog, Divider, IconButton, GridList, GridTile, RaisedButton } from 'material-ui';
import { Row, Col } from 'react-bootstrap';
import request from 'superagent';
import SearchBar from './searchBar';
import Post from './post';
import Screen from '../screen';

export default class Home extends Screen {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      skip: 0
    };
  }

  componentWillUnmount() {
    this.setState({
      posts: []
    });
  }

  async componentWillMount() {
    await this.fetchPosts();
  }

  async fetchPosts(skip = 0) {
    const res = await request
      .get(`${apiUrl}/post?limit=5&skip=${skip}`)
      .withCredentials()
      .catch(e => console.error(e));

    this.setState({
      posts: res.body
    });

    return res.body;
  }

  async changePage(back) {
    this.setState((prevstate) => {
      let { skip } = prevstate;
      const increment = back ? -5 : 5;
      skip += increment;
      if (skip < 0) {
        skip = 0;
      } else if (this.state.posts.length === 0 && !back) {
        skip -= increment;
      }
      this.fetchPosts(skip);
      return { skip };
    });
  }

  renderPosts() {
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

  render() {
    return (
      <div>
        <SearchBar style={ { textAlign: 'center', margin: 10 } } />
        <Row>
          { this.renderPosts() }
        </Row>
        <Row>
          <RaisedButton
            secondary
            name={ 'prev' }
            label={ 'prev page' }
            onTouchTap={ () => { this.changePage(true); } }
          />
          <RaisedButton
            secondary
            name={ 'next' }
            label={ 'next page' }
            onTouchTap={ () => { this.changePage(false); } }
          />
        </Row>
      </div>
    );
  }
}
