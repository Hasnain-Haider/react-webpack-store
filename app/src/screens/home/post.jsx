import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText, CardMedia, CardTitle } from 'material-ui';
import { Row, Col } from 'react-bootstrap';

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: props.expanded,
      title: props.title,
      subtitle: props.description,
      text: props.text,
      imgSrc: props.imgSrc,
      price: props.price
    };

    this.expandChange = this.expandChange.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      ...props
    });
  }

  expandChange(expanded) { return this.setState({ expanded }); }

  render() {
    return (
      <Card
        expandable={ false }
        onExpandChange={ this.expandChange }
        expanded={ this.state.expanded }
      >
        <CardHeader
          title={ this.state.title }
          subtitle={ this.state.subtitle }
          actAsExpander
          showExpandableButton
        />
        <CardText>
          { this.state.text }
        </CardText>
        <CardMedia
          expandable
          overlay={ <CardTitle title={ this.state.title } subtitle={ this.state.subtitle } /> }
        >
          <img src={ this.state.imgSrc } />
        </CardMedia>
      </Card>
    );
  }
}
