import React, { Component } from 'react';
import {
  Paper,
  TextField,
  FlatButton,
  RaisedButton,
  Snackbar,
  CircularProgress,
  Fade
} from 'material-ui';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import request from 'superagent';
import Screen from '../screen';
import Post from '../home/post';

const centerStyle = {
  margin: "3%",
  textAlign: 'center'
};

export default class Account extends Screen {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentWillMount() {
    this.fetchPosts();
  }

  handleChange(fieldName, event) {
    const user = {
      ...this.state.user,
      [fieldName]: event.target.value
    };
    this.setState({ user });
  }

  async fetchPosts() {
    const uid = Screen.getUser()._id;
    const postings = await request
      .post(`${apiUrl}/post/query`)
      .send({ owner: uid });
    console.log(postings);
    this.setState({
      posts: postings.body
    });
  }

  async deletePost(postId) {
    console.log(event, event.target);
    let deletion;
    try {
      deletion = await request.delete(`${apiUrl}/post`).send({ _id: postId });
    } catch (e) {
      console.error(e);
    }
    console.log(deletion);
  }

  renderUserPosts() {
    return this.state.posts.map((post, idx) => (
      <Col sm={ 12 } md={ 6 } lg={ 4 } key={ idx }>
        <Paper key={ idx } style={ { margin: 50, padding: 30 } }>
          <Post
            title={ post.title }
            imgSrc={ post.imgSrc }
            description={ post.description }
            text={ post.text }
            price={ post.price }
          />
          <RaisedButton
            label={ "Delete Post" }
            onTouchTap={ this.deletePost(post._id) }
            secondary
            icon={ <DeleteForever /> }
          />
        </Paper>
      </Col>
    ));
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
            <h3>Your Posts:</h3>
            { this.renderUserPosts() }
            <Col sm={ 0 } md={ 2 } lg={ 3 } />
          </Row>
        </Paper>
      </div>
    );
  }
}

Account.propTypes = {

};
