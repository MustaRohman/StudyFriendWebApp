import Config from 'app/components/Config/';
import AddSubject from 'app/components/AddSubject/';
import SubjectList from 'app/components/SubjectList/';
import Calendar from 'app/containers/Calendar/';
import getEvents from './getEvents.js';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import React, { PropTypes, Component } from 'react';
import { Link, browserHistory } from 'react-router';
import moment from 'moment';

import styles from './timetableForm.css';

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
    events: [],
    finished: false,
    stepIndex: 0,
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
  handleNext = () => {
    const {stepIndex} = this.state;
    const newIndex = stepIndex + 1;
    this.setState({
      stepIndex: newIndex,
      finished: newIndex > 1,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      const newIndex = stepIndex - 1;
      this.setState({
        stepIndex: newIndex,
        finished: newIndex > 1
      });
    }
  };

  getStepContent(stepIndex) {
    const configRender = (
      <Paper className={'paper'} zDepth={1}>
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
      </Paper>
    );
    switch (stepIndex) {
    case 0:
      return configRender;
    case 1:
      return (
        <Paper className={'paper'} zDepth={1}>
          <div className={'subjects'}>
            <AddSubject addSubject={(event) => {this.handleAddSubject(event);}}/>
            <SubjectList subjects={this.state.subjects}/>
          </div>
      </Paper>
      );
    default:
      return configRender;
    }
  }
  async handleCreate() {
    console.log('handleSubmit testing');
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
      const newEvents = getEvents(json, moment);
      const { stepIndex } = this.state;
      const newIndex = stepIndex + 1;
      this.setState({
        events: newEvents,
        stepIndex: newIndex,
        finished: newIndex > 1,
      });
    });
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
    const {finished, stepIndex, events} = this.state;
    const contentStyle = {margin: '0 16px'};
    return (<div className={'parent'}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Add Configuration</StepLabel>
          </Step>
          <Step>
            <StepLabel>Add Subjects</StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          {finished ? (
            <div>
              <Calendar events={events}/>
              <div style={{marginTop: 12}}>
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onTouchTap={this.handlePrev}
                  style={{marginRight: 12}}
                />
              </div>
            </div>
          ) : (
            <div>
              {this.getStepContent(stepIndex)}
              <div className={'buttons'}>
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onTouchTap={this.handlePrev}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={stepIndex === 1 ? 'Create' : 'Next'}
                  primary
                  onTouchTap={stepIndex === 1 ? () => {this.handleCreate();} : this.handleNext}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
