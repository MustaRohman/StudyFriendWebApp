import React from 'react';
import ReactDOM from 'react-dom';
const {Route, Router, IndexRoute, hashHistory, browserHistory} = require('react-router');
import Main from 'Main';
import Login from 'Login';


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <Route path="login" component={Login}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
