import Config from 'app/components/timetable/Config/Config.jsx';
import AddSubject from 'app/components/timetable/AddSubject/AddSubject.jsx';
import SubjectList from 'app/components/timetable/SubjectList/SubjectList.jsx';
import React, { PropTypes, Component } from 'react';

import styles from './timetableForm.css';

const { string, array } = PropTypes;

export default class TimetableForm extends Component {
  static propTypes = {
    name: string,
    subjects: array
  };
  constructor(props) {
    super(props);
  }
  state = {
    name: '',
    subjects: []
  };
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
  }
  render() {
    return (
        <div className={styles.app}>
          <span><SubjectList subjects={this.state.subjects}/></span>
          <h1>Create Timetable</h1>
            <form onSubmit={(event) => {this.handleSubmit(event);}}>
              <Config onNewConfig={this.handleConfig}/>
              <AddSubject addSubject={(event) => {this.handleAddSubject(event);}}/>
            </form>
        </div>
    );
  }
}
