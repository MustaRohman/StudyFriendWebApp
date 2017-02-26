import Config from 'app/components/timetable/Config/Config.jsx';
import AddSubject from 'app/components/timetable/AddSubject/AddSubject.jsx';
import SubjectList from 'app/components/timetable/SubjectList/SubjectList.jsx';
import React, { PropTypes, Component } from 'react';

import styles from './timetableForm.css';

const { string, array, number } = PropTypes;

export default class TimetableForm extends Component {
  static propTypes = {
    name: string,
    'exam-start-date': string,
    'revision-start-date': string,
    'session-duration': number,
    'break-duration': number,
    reward: number,
    subjects: array
  };
  constructor(props) {
    super(props);
  }
  state = {
    name: '',
    'exam-start-date': '',
    'revision-start-date': '',
    'session-duration': 45,
    'break-duration': 15,
    reward: 60,
    subjects: []
  };
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
  //  alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  handleConfig(newValues) {
    this.setState(newValues);
    console.log(this.state);
  }

  handleAddSubject(subject) {
    const newSubjects = this.state.subjects.slice();
    newSubjects.push(subject);
    this.setState({
      subjects: newSubjects
    });
  }
  render() {
    return (
        <div className={styles.app}>
          <h1>Create Timetable</h1>
            <form onSubmit={(event) => {this.handleSubmit(event);}}>
              <span><Config onNewConfig={(newValues) => {this.handleConfig(newValues);}}/></span>
              <SubjectList subjects={this.state.subjects}/>
              <AddSubject addSubject={(event) => {this.handleAddSubject(event);}}/>
            </form>
        </div>
    );
  }
}
