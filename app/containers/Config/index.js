import React, {PropTypes} from 'react';
import Datepicker from 'app/components/Datepicker/';
import TextField from 'material-ui/TextField';
const { number, string, func } = PropTypes;

import styles from './style.css';


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
      <div className={styles.config}>
        <h2>Configuration</h2>
          <TextField
          hintText="Timetable Name"
          floatingLabelText="Timetable Name"
          floatingLabelFixed
          type="text"
          onChange={(event) => {this.props.onNameChange(event);}}
          value={this.props.name} name="name"
          /><br />
        <div className={styles.dates}>
          <div className={styles.left}>
            <label>
              <p>Revision Start Date:</p>
              <Datepicker name="revision-start-date" date={this.props.revisionStartDate} onNewDate={(date) => {this.props.onRevisionDateChange(date);}}/>
            </label>
          </div>
          <div className={styles.right}>
            <label>
              <p>Exam Start Date:</p>
              <Datepicker name="exam-start-date" date={this.props.examStartDate} onNewDate={(date) => {this.props.onExamDateChange(date);}}/>
            </label>
          </div>
        </div>
        <div className={styles.durations}>
          <h3>Durations</h3>
          <label className={'label'}>
            <p>Session:</p>
            <input name="session-duration" type="range" min="30" max="60" step="5" value={this.props.sessionDuration} onChange={(event) => {this.props.onSessionDurationChange(event);}}/>
            <input type="textarea" size="7" value={this.props.sessionDuration} onChange={(event) => {this.props.onSessionDurationChange(event);}}/>
          </label>
          <label className={styles.label}>
            <p>Break:</p>
            <input name="break-duration" type="range" min="10" max="30" step="5" value={this.props.breakDuration} onChange={(event) => {this.props.onBreakDurationChange(event);}}/>
            <input type="textarea" size="7" value={this.props.breakDuration} onChange={(event) => {this.props.onBreakDurationChange(event);}}/>
          </label>
          <label className={styles.label}>
            <p>Reward:</p>
            <input name="reward" type="range" min="30" max="90" step="5" value={this.props.rewardDuration} onChange={(event) => {this.props.onRewardDurationChange(event);}}/>
            <input type="textarea" size="7" value={this.props.rewardDuration} onChange={(event) => {this.props.onRewardDurationChange(event);}}/>
          </label>
        </div>
      </div>
    );
  }
}
