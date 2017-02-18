import Config from 'Config';
import AddSubject from 'AddSubject';
import React, { PropTypes, Component } from 'react';
import styles from './timetableForm.css';

const { string } = PropTypes;

export default class TimetableForm extends Component {
  static propTypes = {
    name: string
  };

  constructor(props) {
    super(props);

    this.state = {
      name: ''
    };
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
  //  alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  handleConfig(updates) {
    this.setState(updates);
  }

  handleAddSubject() {

  }

  render() {
    return (
        <div className={styles.app}>
          <h1>Create Timetable</h1>
          <form onSubmit={(event) => {this.handleSubmit(event);}}>
            <Config onNewConfig={this.handleConfig}/>
            <AddSubject/>
            <input type="submit" value="Create" />
          </form>
        </div>
    );
  }
}
