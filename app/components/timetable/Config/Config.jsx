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
    session: '45',
    break: '15',
    reward: '60'
  };
  handleChange(event) {
    const key = event.target.name;
    const value = event.target.value;
    const newState = _.extend({}, this.state);
    newState[key] = value;
    this.setState(newState);
    this.props.onNewConfig(this.state);
  }
  render() {
    return (
      <div>
        <h2>Configuration</h2>
        <label>
          Timetable Name:
          <input type="text"  defaultValue={this.state.name} name="name" onChange={(event) => {this.handleChange(event);}}/>
        </label>
        <h3>Dates</h3>
        <div>
          <label>
            <p>Revision Start Date:</p>
            <Datepicker onChange={(event) => {this.handleChange(event);}}/>
          </label>
        </div>
        <label>
          <p>Exam Start Date:</p>
          <Datepicker onChange={(event) => {this.handleChange(event);}}/>
        </label>
        <h3>Durations</h3>
        <label>
          <p>Session:</p>
          <input ref="session" type="range" min="30" max="60" step="5" value={this.state.session} onChange={(event) => {this.handleChange(event);}}/>
          <input type="textarea" size="7" value={this.state.session} onChange={(event) => {this.handleChange(event);}}/>
        </label>
        <label>
          <p>Break:</p>
          <input ref="break" type="range" min="10" max="30" step="5" value={this.state.break} onChange={(event) => {this.handleChange(event);}}/>
          <input type="textarea" size="7"value={this.state.break} onChange={(event) => {this.handleChange(event);}}/>
        </label>
        <label>
          <p>Reward:</p>
          <input ref="reward" type="range" min="30" max="90" step="5" value={this.state.reward} onChange={(event) => {this.handleChange(event);}}/>
          <input type="textarea" size="7" value={this.state.reward} onChange={(event) => {this.handleChange(event);}}/>
        </label>
      </div>
    );
  }
}
