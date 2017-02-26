import React from 'react';
import ReactDOM from 'react-dom';
const {Route, Router, IndexRoute, hashHistory, browserHistory} = require('react-router');
import Main from 'app/components/index.js';
import TimetableForm from 'app/components/timetable/TimetableForm/TimetableForm.jsx';


ReactDOM.render(
  // <Router history={browserHistory}>
  //   <Route path="/" component={Main}>
  //     <Route path="login" component={Login}/>
  //   </Route>
  // </Router>,
    <Main/>,
  document.getElementById('root')
);
