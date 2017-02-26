import React, {PropTypes} from 'react';
import Datepicker from 'app/components/timetable/Datepicker/Datepicker.jsx';


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
  handleChange() {
    const updates = {
      name: this.refs.timetableName.value,
      session: this.refs.session.value,
      break: this.refs.break.value,
      reward: this.refs.reward.value
    };
    this.setState(updates);
    this.props.onNewConfig(updates);
  }
  render() {
    return (
      <div>
        <h2>Configuration</h2>
        <label>
          Timetable Name:
          <input type="text"  value={this.state.name} ref="timetableName" onChange={this.handleChange}/>
        </label>
        <h3>Dates</h3>
        <div>
          <label>
            <p>Revision Start Date:</p>
            <Datepicker onChange={this.handleChange}/>
          </label>
        </div>
        <label>
          <p>Exam Start Date:</p>
          <Datepicker onChange={this.handleChange}/>
        </label>
        <h3>Durations</h3>
        <label>
          <p>Session:</p>
          <input ref="session" type="range" min="30" max="60" step="5" value={this.state.session} onChange={this.handleChange}/>
          <input type="textarea" size="7" value={this.state.session} onChange={this.handleChange}/>
        </label>
        <label>
          <p>Break:</p>
          <input ref="break" type="range" min="10" max="30" step="5" value={this.state.break} onChange={this.handleChange}/>
          <input type="textarea" size="7"value={this.state.break} onChange={this.handleChange}/>
        </label>
        <label>
          <p>Reward:</p>
          <input ref="reward" type="range" min="30" max="90" step="5" value={this.state.reward} onChange={this.handleChange}/>
          <input type="textarea" size="7" value={this.state.reward} onChange={this.handleChange}/>
        </label>
      </div>
    );
  }
}
