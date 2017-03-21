import Config from 'app/components/Config/';
import AddSubject from 'app/components/AddSubject/';
import SubjectList from 'app/components/SubjectList/';
import Calendar from 'app/containers/Calendar/';
import Paper from 'material-ui/Paper';

import React, { PropTypes, Component } from 'react';
import { Link, browserHistory } from 'react-router';
import moment from 'moment';

import styles from './timetableForm.css';

const { string, array, number, object } = PropTypes;


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
      'session-duration': parseInt(event.target.value, 10)
    });
  }
  handleBreakDurationChange(event) {
    this.setState({
      'break-duration': parseInt(event.target.value, 10)
    });
  }
  handleRewardDuration(event) {
    this.setState({
      reward: {
        duration: parseInt(event.target.value, 10)
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
    console.log('handleSubmit testing');
    event.preventDefault();
    fetch('/timetable/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        config: {
          name: this.state.name,
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
      const newEvents = this.createEvents(json);
      this.setState({
        events: newEvents
      });
    });
  }

  createEvents(json) {
    const timetable = json;
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
    return newEvents;
  }

  handleConfig(newValues) {
    this.setState(newValues);
  }

  handleAddSubject(subject) {
    function hasSameName(existing) {
      return subject.name === existing.name;
    }
    if (this.state.subjects.some(hasSameName)) {
      return;
    }
    const newSubjects = this.state.subjects.slice();
    newSubjects.push(subject);
    this.setState({
      subjects: newSubjects
    });
  }
  render() {
    return (
      this.state.events.length !== 0 ?
        <Calendar events={this.state.events}/> :
        <div className={'timetable'}>
          <form onSubmit={(event) => {this.handleSubmit(event);}}>
            <div className={'form'}>
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
              <div className={'subjects'}>
                <AddSubject addSubject={(event) => {this.handleAddSubject(event);}}/>
                <SubjectList subjects={this.state.subjects}/>
              </div>
            </div>
            <button className={'submit'}>Create</button>
          </form>
        </div>
    );
  }
}
