import Config from 'app/components/Config/';
import AddSubject from 'app/components/AddSubject/';
import SubjectList from 'app/components/SubjectList/';
import React, { PropTypes, Component } from 'react';
import moment from 'moment';

import styles from './timetableForm.css';

const { string, array, number, object } = PropTypes;

// DEVELOPMENT:0 Refactor Config component
// DEVELOPMENT:10 GET request to timetable-api
// TODO:20 Display JSON response
// TODO:30 Display in calendar Component
// TODO:40 Log in

export default class TimetableForm extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    name: 'NewTimetable',
    'revision-start-date': moment().format('YYYY-MM-DD'),
    'exam-start-date': moment().format('YYYY-MM-DD'),
    'session-duration': 45,
    'break-duration': 15,
    reward: {
      duration: 60
    },
    subjects: []
  };
  handleNameChange(event) {
    this.setState({
      name: event.target.value
    });
  }
  handleSessionDurationChange(event) {
    this.setState({
      'session-duration': parseInt(event.target.value)
    });
  }
  handleBreakDurationChange(event) {
    this.setState({
      'break-duration': parseInt(event.target.value)
    });
  }
  handleRewardDuration(event) {
    this.setState({
      reward: {
        duration: parseInt(event.target.value)
      }
    });
  }
  handleRevisionDateChange(date) {
    this.setState({
      'revision-start-date': date.format('YYYY-MM-DD')
    });
  }
  handleExamDateChange(date) {
    this.setState({
      'exam-start-date': date.format('YYYY-MM-DD')
    });
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  async handleSubmit(event) {
  //  alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    const response = await fetch('/timetable/create', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log(response);
    console.log(await response.json());
    // fetch('https://studyfriend-timetable.herokuapp.com', {
    //   method: 'GET'
    //   // mode: 'no-cors',
    // }).then((res) => {
    //   return res.status;
    // }).then((text) => {
    //   console.log(text);
    // });
  }


  handleConfig(newValues) {
    this.setState(newValues);
    console.log(this.state);
  }

  handleAddSubject(subject) {
    const newSubjects = this.state.subjects.slice();
    newSubjects.push(subject);
    this.setState({
      subjects: newSubjects
    });
    console.log(this.state);
  }
  render() {
    return (
        <div className={styles.app}>
          <h1>Create Timetable</h1>
            <form onSubmit={(event) => {this.handleSubmit(event);}}>
              <span>
                <Config onNewConfig={(newValues) => {this.handleConfig(newValues);}}
                onSessionDurationChange={(value)  => {this.handleSessionDurationChange(value);}}
                onNameChange={(value) => {this.handleNameChange(value);}}
                onBreakDurationChange={(value) => {this.handleBreakDurationChange(value);}}
                onRewardDurationChange={(value) => {this.handleRewardDuration(value);}}
                onRevisionDateChange={(date) => {this.handleRevisionDateChange(date);}}
                onExamDateChange={(date) => {this.handleExamDateChange(date);}}
                name={this.state.name}
                examStartDate={this.state['exam-start-date']}
                revisionStartDate={this.state['revision-start-date']}
                sessionDuration={this.state['session-duration']}
                breakDuration={this.state['break-duration']}
                rewardDuration={this.state.reward.duration} />
              </span>
              <SubjectList subjects={this.state.subjects}/>
              <AddSubject addSubject={(event) => {this.handleAddSubject(event);}}/>
              <input type="submit"/>
            </form>
        </div>
    );
  }
}
