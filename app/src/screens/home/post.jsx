import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui';

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: props.expanded,
      title: props.title,
      subtitle: props.description,
      text: props.text,
      price: props.price
    };
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
      </Card>
    );
  }
}
