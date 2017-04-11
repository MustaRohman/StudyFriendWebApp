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
// COMPLETE:20 Log in
// COMPLETE:0 DynamoDB
// TODO:0 Add ExamStart to events for Calendar
// COMPLETE:10 Basic Styling

const checkAuthentication = (nextState, replace, callback) => {
  fetch('/user/authenticate', {
    method: 'GET',
    credentials: 'same-origin'
  }).then((res) => {
    return res.text();
  }).then((text) => {
    if (text !== 'true') {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  }).catch((err) => {
    console.log(err);
  });
};

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Main} onEnter={checkAuthentication} >
      <IndexRoute component={Dashboard} />
      <Route path="create"  component={TimetableForm} />
      <Route path="list" component={TimetableList}>
        <Route path=":timetableName"/>
      </Route>
    </Route>
    <Route path="/login" component={Login}/>
  </Router>,
  document.getElementById('root')
);
