import React from 'react';
import { Link } from 'react-router';

import './main.css';

export default class Main extends React.Component {

  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1>StudyFriend</h1>
          <ul>
            <li><Link to="/create">Create</Link></li>
            <li><Link to="/view">View</Link></li>
          </ul>
        </div>
          {this.props.children}
      </div>
    );
  }
}
