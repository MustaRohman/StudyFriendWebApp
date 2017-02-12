import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

// require('react-datepicker/dist/react-datepicker.css');

const Datepicker = React.createClass({
  displayName: 'Example',

  getInitialState: function() {
    return {
      startDate: moment()
    };
  },

  handleChange: function(date) {
    this.setState({
      startDate: date
    });
  },

  render: function() {
    return <DatePicker selected={this.state.startDate} onChange={this.handleChange} />;
  }
});

module.exports = Datepicker;
