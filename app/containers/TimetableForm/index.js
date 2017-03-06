import Config from 'app/components/Config/';
import AddSubject from 'app/components/AddSubject/';
import SubjectList from 'app/components/SubjectList/';
import Calendar from 'app/containers/Calendar/';

import React, { PropTypes, Component } from 'react';
import { Link, browserHistory } from 'react-router';
import moment from 'moment';

import './timetableForm.css';

const { string, array, number, object } = PropTypes;

// COMEPLETE:10 Refactor Config component
// COMEPLETE:0 GET request to timetable-api
// DEVELOPMENT:0 Display JSON response
// DEVELOPMENT:10 Display in calendar Component
// TODO:30 Log in
// TODO:20 DynamoDB

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
    subjects: [],
    events: []
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
    event.preventDefault();
    fetch('/timetable/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        config: {
          'exam-start-date': this.state['exam-start-date'],
          'revision-start-date': this.state['revision-start-date'],
          'session-duration': this.state['session-duration'],
          'break-duration': this.state['break-duration'],
          reward: this.state.reward
        },
        subjects: this.state.subjects
      })
    }).then((res) => {
      return res.json();
    }).then((json) => {
      this.createEvents(json);
      // Save json in DynamoDB
      const path = '/create/result/12';
      browserHistory.push(path);
    });
  }

  createEvents(json) {
    const timetable = json.timetableAssignment;
    const newEvents = [];

    for (const date in timetable) {
      if (!timetable.hasOwnProperty(date)) continue;

      timetable[date].forEach((period) => {
        const date = period.dateTime.date.split('-');
        const startTime = period.dateTime.time;
        const startDate = new Date(
          parseInt(date[0]),
          parseInt(date[1]) - 1,
          parseInt(date[2]),
          parseInt(startTime.hour),
          parseInt(startTime.minute),
        );

        const temp = {
          title: period.topicName,
          start: startDate
        };

        if (period.type === 'BREAK') {
          temp.title = 'Break';
        } else if (period.type === 'REWARD') {
          temp.title = 'Reward';
        }

        if (period.type === 'BREAK_DAY') {
          temp.allDay = true;
        }

        if (period.type === 'SUBJECT' || 'BREAK') {
          temp.end = moment(startDate).add(period.periodDuration, 'm').toDate();
        }

        console.log(temp);
        newEvents.push(temp);
      });
    }
    this.setState({
      events: newEvents
    });
  }

  handleConfig(newValues) {
    this.setState(newValues);
  }

  handleAddSubject(subject) {
    const newSubjects = this.state.subjects.slice();
    newSubjects.push(subject);
    this.setState({
      subjects: newSubjects
    });
  }
  render() {
    return (
        <div>
          <h1 className="timetable">Create Timetable</h1>
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
            {this.props.children}
        </div>
    );
  }
}
