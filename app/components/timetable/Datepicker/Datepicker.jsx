import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import './react-datepicker.css';

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
    return <DatePicker
      todayButton={"Today's Date"}
              selected={this.state.startDate}
              onChange={this.handleChange}
              dateFormat="YYYY/MM/DD"
              showMonthDropdown />
  }
});

module.exports = Datepicker;
