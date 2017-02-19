import React from 'react';
import TopicList from 'TopicList';
import SubjectList from 'app/components/timetable/SubjectList/SubjectList.jsx';

export default class AddSubject extends React.Component {
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
    console.log(this.state);
  }
  handleAddTopic(newTopics) {
    this.setState({
      topics: newTopics
    });
    console.log(this.state);
  }
  handleAddSubject(event) {
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <h2>Add Subjects</h2>
        <SubjectList />
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
