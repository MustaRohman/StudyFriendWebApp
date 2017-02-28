import React, {PropTypes} from 'react';
import Datepicker from 'app/components/timetable/Datepicker/Datepicker.jsx';
import _ from 'underscore';


export default class Config extends React.Component {
  static propTypes = {
    onNewConfig: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
  }
  state = {
    name: 'NewTimetable',
    'exam-start-date': '',
    'revision-start-date': '',
    'session-duration': 45,
    'break-duration': 15,
    reward: {
      duration: 60},
  };
  handleChange(event) {
    const key = event.target.name;
    let value = event.target.value;
    if (key === 'reward') {
      value = {duration: event.target.value};
    }
    const newState = _.extend({}, this.state);
    newState[key] = value;
    this.setState(newState);
    this.props.onNewConfig(this.state);
  }
  handleNameChange(event) {
    const name = event.target.value;
    console.log(name);
    this.setState({name});
  }
  handleDateChange(date, name) {
    const newState = _.extend({}, this.state);
    newState[name] = date.format('YYYY-MM-DD');
    this.setState(newState);
    this.props.onNewConfig(this.state);
  }
  render() {
    return (
      <div>
        <h2>Configuration</h2>
        <label>
          Timetable Name:
          <input type="text"  value={this.state.name} name="name" onChange={(event) => {this.handleNameChange(event);}}/>
        </label>
        <h3>Dates</h3>
        <div>
          <label>
            <p>Revision Start Date:</p>
            <Datepicker name="revision-start-date" onNewDate={(date, name) => {this.handleDateChange(date, name);}}/>
          </label>
        </div>
        <label>
          <p>Exam Start Date:</p>
          <Datepicker name="exam-start-date" onNewDate={(date, name) => {this.handleDateChange(date, name);}}/>
        </label>
        <h3>Durations</h3>
        <label>
          <p>Session:</p>
          <input name="session-duration" type="range" min="30" max="60" step="5" value={this.state['session-duration']} onChange={(event) => {this.handleChange(event);}}/>
          <input type="textarea" size="7" value={this.state['session-duration']} onChange={(event) => {this.handleChange(event);}}/>
        </label>
        <label>
          <p>Break:</p>
          <input name="break-duration" type="range" min="10" max="30" step="5" value={this.state['break-duration']} onChange={(event) => {this.handleChange(event);}}/>
          <input type="textarea" size="7" value={this.state['break-duration']} onChange={(event) => {this.handleChange(event);}}/>
        </label>
        <label>
          <p>Reward:</p>
          <input name="reward" type="range" min="30" max="90" step="5" value={this.state.reward} onChange={(event) => {this.handleChange(event);}}/>
          <input type="textarea" size="7" value={this.state.reward} onChange={(event) => {this.handleChange(event);}}/>
        </label>
      </div>
    );
  }
}
