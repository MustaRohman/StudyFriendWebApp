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
  handleChange: function() {
    this.setState({
      name: this.refs.timetableName.value,
      session: this.refs.session.value,
      break: this.refs.break.value,
      reward: this.refs.reward.value
    });
  },
  render: function() {
    return (
      <div>
        <h2>Configuration</h2>
        <label>
          Timetable Name:
          <input type="text"  value={this.state.name} ref="timetableName" onChange={this.handleChange}/>
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
          <input ref="session" type="range" min="30" max="60" step="5" value={this.state.session} onChange={this.handleChange}/>
          <input type="textarea" value={this.state.session}/>
        </label>
        <label>
          Break:
          <input ref="break" type="range" min="10" max="30" step="5" value={this.state.break} onChange={this.handleChange}/>
          <input type="textarea" value={this.state.break}/>
        </label>
        <label>
          Reward:
          <input ref="reward" type="range" min="30" max="90" step="5" value={this.state.reward} onChange={this.handleChange}/>
          <input type="textarea" value={this.state.reward}/>
        </label>
      </div>
    );
  }
});

module.exports = Config;
