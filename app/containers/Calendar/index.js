import React, {Component, PropTypes} from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
// import events from './events.js';

import {} from './react-big-calendar.css';
import styles from './style.css';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

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
