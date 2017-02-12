import React from 'react';
import Config from 'Config';
import AddSubject from 'AddSubject';
import Datepicker from 'Datepicker';

const TimetableForm = React.createClass({
  getDefaultProps: function() {
    return {
      value: 'Name'
    };
  },
  getInitialState: function() {
    return {
      value: this.props.value
    };
  },
  handleChange(event) {
   this.setState({value: event.target.value});
  },
  handleSubmit(event) {
   alert('A name was submitted: ' + this.state.value);
   event.preventDefault();
  },
  render: function() {
    return (
      <div>
        <h1>Create Timetable</h1>
        <form onSubmit={this.handleSubmit}>
          <Config/>
          <AddSubject/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
});

module.exports = TimetableForm;
