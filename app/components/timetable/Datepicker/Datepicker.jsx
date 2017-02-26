import React, { PropTypes } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import './react-datepicker.css';

export default class Datepicker extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onNewDate: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
  }

  state = {
    startDate: moment()
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
    this.props.onNewDate(date, this.props.name);
  }

  render() {
    return (<DatePicker
      todayButton={"Today's Date"}
              selected={this.state.startDate}
              onChange={(date) => {this.handleChange(date);}}
              dateFormat="YYYY/MM/DD"
              showMonthDropdown />);
  }
}

module.exports = Datepicker;
