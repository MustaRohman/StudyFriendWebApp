import React from 'react';
import { Link } from 'react-router';

import styles from './main.css';

const activeStyle = {
  color: 'white'
};

export default class Main extends React.Component {

  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1>StudyFriend</h1>
          <ul>
            <li className={'link'}><Link to="/create" activeStyle={activeStyle}>Create</Link></li>
            <li className={'link'}><Link to="/view" activeStyle={{ color: 'white' }}>View</Link></li>
          </ul>
        </div>
          {this.props.children}
      </div>
    );
  }
}
