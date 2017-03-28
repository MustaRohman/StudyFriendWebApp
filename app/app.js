import React from 'react';
import ReactDOM from 'react-dom';
const {Route, Router, IndexRoute, hashHistory, browserHistory} = require('react-router');
import Main from 'app/components/index.js';
import TimetableForm from 'app/containers/TimetableForm/';
import Dashboard from 'app/containers/Dashboard/';
import TimetableList from 'app/containers/TimetableList/';
import Login from 'app/containers/Login/';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

// COMEPLETE:30 Refactor Config component
// COMEPLETE:20 GET request to timetable-api
// COMEPLETE:10 Display JSON response
// COMEPLETE:0 Display in calendar Component
// TODO:0 Log in
// TODO:10 DynamoDB
// TODO: Add ExamStart to events for Calendar
// DEVELOPMENT:0 Basic Styling

// async function getTimetableList() {
//   fetch('/timetable/list', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     credentials: 'same-origin',
//   }).then((res) => {
//     return res.json();
//   }).then((json) => {
//     console.log(json);
//   });
// }

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Dashboard} />
      <Route path="create" component={TimetableForm} />
      <Route path="list" component={TimetableList}>
        <Route path=":timetableName"/>
      </Route>
    </Route>
    <Route path="/login" component={Login}/>
  </Router>,
  document.getElementById('root')
);
