import React, {PropTypes} from 'react';
import styles from './style.css';

export default class SubjectList extends React.Component {
  static propTypes = {
    subjects: PropTypes.array.isRequired
  }
  render() {
    const listItems = this.props.subjects.map((subject, index) =>
      <li key={index}><h4>{subject.name}</h4></li>
    );
    return (
      <div className={'subjectlist'}>
        <h3>Subject List</h3>
        <ul>{listItems}</ul>
      </div>
    );
  }
}

// export const YourFace = props => {
//   return (
//       <div>lol</div>
//   );
// };
//
// YourFace.PropTypes = {
//
// }
