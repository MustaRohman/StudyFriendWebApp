import React, {PropTypes} from 'react';
import TopicDialogButton from 'app/components/TopicDialogButton/';
import RaisedButton from 'material-ui/RaisedButton';

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
    console.log(`Topic Duration: ${parseInt(event.target.value, 10) * 60}`);
    this.setState({'topic-duration': parseInt(event.target.value, 10) * 60});
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
    this.setState({
      topics: []
    });
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
                    <TopicDialogButton style={{marginTop: 20}} topics={this.state.topics}
                      addTopics={(topics) => {this.handleAddTopic(topics);}}
                      />
                  <RaisedButton style={{marginTop: 20}} label="Add Subject" secondary onTouchTap={(event) => {
                    this.handleAddSubject(event);
                  }}/>
                  </div>
                </div>
            </div>
    );
  }
}
