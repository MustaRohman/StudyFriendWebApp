import React from 'react';
import ReactDOM from 'react-dom';
const {Route, Router, IndexRoute, hashHistory, browserHistory} = require('react-router');
import Main from 'app/components/index.js';
import TimetableForm from 'app/containers/TimetableForm/';
import Calendar from 'app/containers/Calendar/';
import Dashboard from 'app/containers/Dashboard/';
import TimetableList from 'app/containers/TimetableList/';

// COMEPLETE:30 Refactor Config component
// COMEPLETE:20 GET request to timetable-api
// COMEPLETE:10 Display JSON response
// COMEPLETE:0 Display in calendar Component
// TODO:0 Log in
// TODO:10 DynamoDB
// DEVELOPMENT:0 Basic Styling

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Dashboard} />
      <Route path="create" component={TimetableForm}>
        <Route path="result/:timetableId" component={Calendar}/>
      </Route>
      <Route path="view" component={TimetableList}>
        <Route path="view/:timetableId"/>
      </Route>
    </Route>
  </Router>,
  document.getElementById('root')
);
