import React, { PropTypes, Component } from 'react';

export default class TopicListItem extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    itemDelete: PropTypes.func.isRequired
  }

  onDelete(event) {
    event.preventDefault();
    this.props.itemDelete(this.props.name);
  }

  render() {
    return (
      <div>
        <p>{this.props.name} <span><button onClick={(event) => {this.onDelete(event);}}>x</button></span></p>
      </div>
    );
  }
}
