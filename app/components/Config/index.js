import React, {PropTypes} from 'react';
import Datepicker from 'app/components/Datepicker/';
import _ from 'underscore';
const { number, string, func } = PropTypes;


export default class Config extends React.Component {
  static propTypes = {
    onNewConfig: func.isRequired,
    onNameChange: func.isRequired,
    onRevisionDateChange: func.isRequired,
    onSessionDurationChange: func.isRequired,
    onBreakDurationChange: func.isRequired,
    onRewardDurationChange: func.isRequired,
    onExamDateChange: func.isRequired,
    name: string.isRequired,
    examStartDate: string.isRequired,
    revisionStartDate: string.isRequired,
    sessionDuration: number.isRequired,
    breakDuration: number.isRequired,
    rewardDuration: number.isRequired
  }

  render() {
    return (
      <div>
        <h2>Configuration</h2>
        <label>
          Timetable Name:
          <input type="text"  value={this.props.name} name="name" onChange={(event) => {this.props.onNameChange(event);}}/>
        </label>
        <h3>Dates</h3>
        <div>
          <label>
            <p>Revision Start Date:</p>
            <Datepicker name="revision-start-date" date={this.props.revisionStartDate} onNewDate={(date) => {this.props.onRevisionDateChange(date);}}/>
          </label>
        </div>
        <label>
          <p>Exam Start Date:</p>
          <Datepicker name="exam-start-date" date={this.props.examStartDate} onNewDate={(date) => {this.props.onExamDateChange(date);}}/>
        </label>
        <h3>Durations</h3>
        <label>
          <p>Session:</p>
          <input name="session-duration" type="range" min="30" max="60" step="5" value={this.props.sessionDuration} onChange={(event) => {this.props.onSessionDurationChange(event);}}/>
          <input type="textarea" size="7" value={this.props.sessionDuration} onChange={(event) => {this.props.onSessionDurationChange(event);}}/>
        </label>
        <label>
          <p>Break:</p>
          <input name="break-duration" type="range" min="10" max="30" step="5" value={this.props.breakDuration} onChange={(event) => {this.props.onBreakDurationChange(event);}}/>
          <input type="textarea" size="7" value={this.props.breakDuration} onChange={(event) => {this.props.onBreakDurationChange(event);}}/>
        </label>
        <label>
          <p>Reward:</p>
          <input name="reward" type="range" min="30" max="90" step="5" value={this.props.rewardDuration} onChange={(event) => {this.props.onRewardDurationChange(event);}}/>
          <input type="textarea" size="7" value={this.props.rewardDuration} onChange={(event) => {this.props.onRewardDurationChange(event);}}/>
        </label>
      </div>
    );
  }
}
