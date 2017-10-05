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
  }

  componentWillReceiveProps(props){
    const { expanded, title, subtitle, text, price, imgSrc } = props;
    this.setState({ expanded, title, subtitle, text, price, imgSrc });
  }

  expandChange = (expanded) => { this.setState({ expanded }) }

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
            actAsExpander={ true }
            showExpandableButton={ true }
          />
          <CardText>
            { this.state.text }
          </CardText>
          <CardMedia
            expandable={true}
            overlay={<CardTitle title={ this.state.title } subtitle="Overlay subtitle" />}
          >
            <img src={ this.state.imgSrc } />
          </CardMedia>
        </Card>
    );
  }
}
