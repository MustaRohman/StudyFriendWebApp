import React, {PropTypes} from 'react';
import styles from './style.css';
import ListItem from 'app/components/ListItem/';

export default class SubjectList extends React.Component {
  static propTypes = {
    subjects: PropTypes.array.isRequired,
    deleteSubject: PropTypes.func.isRequired
  }
  render() {
    const listItems = this.props.subjects.map((subject, index) =>
        <ListItem name={subject.name} key={index}
          itemDelete={(item)=> {this.props.deleteSubject(item);}}/>
        );

    return (
      <div className={'subjectlist'}>
        <h3>Subject List</h3>
        <ul>{listItems}</ul>
      </div>
    );
  }
}
