// code based on matieral-ui http://www.material-ui.com/#/
import React, { PropTypes } from 'react';
import TopicInputField from 'app/components/TopicInputField/';
import ListItem from 'app/components/ListItem/';
import { List } from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


export default class TopicDialogButton extends React.Component {
  static propTypes = {
    addTopic: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  state = {
    open: false,
    topicList: []
  };
  handleListChange(item) {
    function hasItem(name) {
      return item === name;
    }
    if (this.state.topicList.some(hasItem)) {
      return;
    }
    const newList = this.state.topicList.slice();
    newList.push(item);
    this.setState({
      topicList: newList
    });
    this.props.addTopic(newList);
  }

  handleItemDelete(item) {
    const newList = this.state.topicList.slice();
    const index = newList.indexOf(item);
    if (index !== -1) {
      newList.splice(index, 1);
    }
    this.setState({
      topicList: newList
    });
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="OK"
        primary
        onTouchTap={this.handleClose}
      />,
    ];
    const listItems = this.state.topicList.map((name, index) =>
        <ListItem name={name} key={index}
          itemDelete={(item)=> {this.handleItemDelete(item);}}/>
        );

    return (
      <div>
        <RaisedButton label="Manage Topics" onTouchTap={this.handleOpen} />
        <Dialog
          title="Add Topics for Subject"
          actions={actions}
          modal
          open={this.state.open}>
          <TopicInputField listChange={(name)=> {this.handleListChange(name);}}/>
        <br />
            <List style={{width: 300}}>
              {listItems}
            </List>
        </Dialog>
      </div>
    );
  }
}
