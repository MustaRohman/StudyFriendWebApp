import React from 'react';
import Datepicker from 'Datepicker';

const Config = React.createClass({
  getDefaultProps: function() {
    return {
      name: 'Timetable1',
      session: '45',
      break: '15',
      reward: '60'
    }
  },
  getInitialState: function() {
    return {
      name: this.props.name,
      session: this.props.session,
      break: this.props.break,
      reward: this.props.reward
    };
  },
  render: function() {
    return (
      <div>
        <h2>Configuration</h2>
        <label>
          Timetable Name:
          <input type="text" name="timetableName" value={this.state.name}/>
        </label>
        <h3>Dates</h3>
        <label>
          Revision Start Date:
          <Datepicker/>
        </label>
        <label>
          Exam Start Date:
          <Datepicker/>
        </label>
        <h3>Durations</h3>
        <label>
          Session:
          <input type="range" min="30" max="60" value={this.state.session}/>
        </label>
        <label>
          Break:
          <input type="range" min="10" max="30" value={this.state.break}/>
        </label>
        <label>
          Reward:
          <input type="range" min="30" max="90" value={this.state.reward}/>
        </label>
      </div>
    );
  }
});

module.exports = Config;
