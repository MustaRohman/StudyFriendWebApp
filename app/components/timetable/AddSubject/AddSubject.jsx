import React, {PropTypes} from 'react';
import TopicList from 'app/components/timetable/TopicList/TopicList.jsx';

export default class AddSubject extends React.Component {
  static propTypes = {
    addSubject: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
  }
  state = {
    topics: [],
    name: '',
    'topic-duration': ''
  }
  handleAddTopicDuration(event) {
    event.preventDefault();
    this.setState({
      'topic-duration': event.target.value
    });
  }
  handleAddName(event) {
    event.preventDefault();
    this.setState({
      name: event.target.value
    });
  }
  handleAddTopic(newTopics) {
    this.setState({
      topics: newTopics
    });
  }
  handleAddSubject(event) {
    event.preventDefault();
    this.props.addSubject(this.state);
  }
  render() {
    return (
      <div>
        <h2>Add Subjects</h2>
        <div>
          <label>
            <p>Subject Name:</p>
            <input onChange={(event) => {this.handleAddName(event);}} type="text"/>
          </label>
          <label>
            <p>Topic Duration (Hours):</p>
            <input onChange={(event) => {this.handleAddTopicDuration(event);}} type="number"/>
          </label>
          <h3>Topics</h3>
          <TopicList addTopic={(topic) => {this.handleAddTopic(topic);}} />
          <button onClick={(event) => {this.handleAddSubject(event);}}>Add</button>
        </div>
      </div>
    );
  }
}
