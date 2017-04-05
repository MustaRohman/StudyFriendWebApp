import React, { PropTypes } from 'react';
import TopicInputField from 'app/components/TopicInputField/';
import TopicListItem from 'app/components/TopicListItem/';
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
        <TopicListItem name={name} key={index}
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


// export default class TopicList extends Component {
//   static propTypes = {
//     addTopic: PropTypes.func.isRequired
//   }
//   constructor(props) {
//     super(props);
//   }
//
//   state = {
//     topicList: []
//   }
//   handleListChange(item) {
//     function hasItem(name) {
//       return item === name;
//     }
//     if (this.state.topicList.some(hasItem)) {
//       return;
//     }
//     const newList = this.state.topicList.slice();
//     newList.push(item);
//     this.setState({
//       topicList: newList
//     });
//     this.props.addTopic(newList);
//   }
//
//   handleItemDelete(item) {
//     const newList = this.state.topicList.slice();
//     const index = newList.indexOf(item);
//     if (index !== -1) {
//       newList.splice(index, 1);
//     }
//     this.setState({
//       topicList: newList
//     });
//   }
//
//   render() {
//     const listItems = this.state.topicList.map((name, index) =>
//     <li key={index}><TopicListItem name={name}
//       itemDelete={(item)=> {this.handleItemDelete(item);}}/></li>
//     );
//     return (
//       <div className={'topiclist'}>
//         <TopicInputField className={'topicinput'} listChange={(name)=> {this.handleListChange(name);}}/>
//         <ul>{listItems}</ul>
//       </div>
//     );
//   }
// }
