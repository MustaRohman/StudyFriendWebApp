import Config from 'Config';
import AddSubject from 'app/components/timetable/AddSubject/AddSubject.jsx';
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
      name: '',
      subjects: []
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

  handleAddSubject(subject) {
    const newSubjects = this.state.subjects.splice();
    newSubjects.push(subject);
    this.setState({
      subjects: newSubjects
    });
    console.log(this.state.subjects);
  }

  render() {
    return (
        <div className={styles.app}>
          <h1>Create Timetable</h1>
          <form onSubmit={(event) => {this.handleSubmit(event);}}>
            <Config onNewConfig={this.handleConfig}/>
            <AddSubject addSubject={(event) => {this.handleAddSubject(event);}}/>
            <input type="submit" value="Create" />
          </form>
        </div>
    );
  }
}
