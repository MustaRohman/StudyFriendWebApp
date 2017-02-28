import Config from 'app/components/Config/';
import AddSubject from 'app/components/AddSubject/';
import SubjectList from 'app/components/SubjectList/';
import React, { PropTypes, Component } from 'react';

import styles from './timetableForm.css';

const { string, array, number, object } = PropTypes;

export default class TimetableForm extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    name: '',
    'exam-start-date': '',
    'revision-start-date': '',
    'session-duration': 45,
    'break-duration': 15,
    reward: {
      duration: 60
    },
    subjects: []
  };
  handleNameChange(value) {
    this.setState({
      name: value
    });
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  async handleSubmit(event) {
  //  alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    const response = await fetch('/timetable/create', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log(response);
    console.log(await response.json());
    // fetch('https://studyfriend-timetable.herokuapp.com', {
    //   method: 'GET'
    //   // mode: 'no-cors',
    // }).then((res) => {
    //   return res.status;
    // }).then((text) => {
    //   console.log(text);
    // });
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
    console.log(this.state);
  }
  render() {
    return (
        <div className={styles.app}>
          <h1>Create Timetable</h1>
            <form onSubmit={(event) => {this.handleSubmit(event);}}>
              <span><Config onNewConfig={(newValues) => {this.handleConfig(newValues);}}/></span>
              <SubjectList subjects={this.state.subjects}/>
              <AddSubject addSubject={(event) => {this.handleAddSubject(event);}}/>
              <input type="submit"/>
            </form>
        </div>
    );
  }
}
