import React, { PropTypes, Component } from 'react';
import IconButton from 'material-ui/IconButton';
import { ListItem } from 'material-ui/List';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

export default class CustomListItem extends Component {
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
      <ListItem
        primaryText={this.props.name}
        rightIconButton={
          <IconButton onTouchTap={(event) => {this.onDelete(event);}}><NavigationClose /></IconButton>
        } />
    );
  }
}
