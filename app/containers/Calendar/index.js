// based on code from react-big-calendar https://github.com/intljusticemission/react-big-calendar
import React, {Component, PropTypes} from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';


import {} from './react-big-calendar.css';
import styles from './style.css';

BigCalendar.momentLocalizer(moment);

export default class Calendar extends Component {
  static propTypes = {
    events: PropTypes.array.isRequired
  }
  render() {
    return (
      <div className={'calendar'}>
        <BigCalendar
          {...this.props}
          events={this.props.events}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
    );
  }
}
