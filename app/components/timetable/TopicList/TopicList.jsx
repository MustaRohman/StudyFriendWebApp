import React, { PropTypes, Component } from 'react';
import TopicInputField from 'app/components/timetable/TopicInputField/TopicInputField.jsx';
import TopicListItem from 'app/components/timetable/TopicListItem/TopicListItem.jsx';

import Alert from 'react-s-alert';

export default class TopicList extends Component {
  static propTypes = {
    addTopic: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
  }

  state = {
    topicList: []
  }
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

  render() {
    const listItems = this.state.topicList.map((name, index) =>
    <li key={index}><TopicListItem name={name}
      itemDelete={(item)=> {this.handleItemDelete(item);}}/></li>
    );
    console.log(listItems);
    return (
      <div>
        <TopicInputField listChange={(name)=> {this.handleListChange(name);}}/>
        <ul>{listItems}</ul>
      </div>
    );
  }
}
