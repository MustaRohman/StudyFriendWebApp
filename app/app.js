// based on code from material-ui http://www.material-ui.com/#/
import React from 'react';
import ReactDOM from 'react-dom';
const {Route, Router, IndexRoute, hashHistory, browserHistory} = require('react-router');
import Main from 'app/components/index.js';
import TimetableForm from 'app/containers/TimetableForm/';
import Dashboard from 'app/containers/Dashboard/';
import TimetableList from 'app/containers/TimetableList/';
import Login from 'app/components/Login/';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

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
    </Route>
    <Route path="/login" component={Login}/>
  </Router>,
  document.getElementById('root')
);
