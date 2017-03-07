import React, {PropTypes} from 'react';
import TopicList from 'app/components/TopicList/';
import styles from './style.css';

export default class AddSubject extends React.Component {
  static propTypes = {
    addSubject: PropTypes.func.isRequired
  }

  state = {
    topics: [],
    name: '',
    'topic-duration': ''
  }
  handleAddTopicDuration(event) {
    event.preventDefault();
    this.setState({'topic-duration': parseInt(event.target.value)});
  }
  handleAddName(event) {
    event.preventDefault();
    this.setState({name: event.target.value});
  }
  handleAddTopic(newTopics) {
    this.setState({topics: newTopics});
  }
  handleAddSubject(event) {
    event.preventDefault();
    if (this.state.topics.length !== 0 && this.state.name && this.state['topic-duration']) {
      this.props.addSubject(this.state);
    }
  }
  render() {
    return (
            <div className={'addsubject'}>
                <h2>Add Subjects</h2>
                <div className={'row'}>
                  <div className={'left'}>
                    <div>
                      <label>
                          <p>Subject Name:</p>
                          <input onChange={(event) => {
                            this.handleAddName(event);
                          }} type="text"/>
                      </label>
                      <label>
                          <p>Topic Duration (Hours):</p>
                          <input onChange={(event) => {
                            this.handleAddTopicDuration(event);
                          }} type="number"/>
                      </label>
                    </div>
                  </div>
                  <div className={'right'}>
                    <h3>Topics</h3>
                    <TopicList addTopic={(topic) => {
                      this.handleAddTopic(topic);
                    }}/>
                  </div>
                </div>

                <button onClick={(event) => {
                  this.handleAddSubject(event);
                }}>Add Subject</button>
            </div>
    );
  }
}
