import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import { GoogleLogin } from 'react-google-login-component';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import styles from './style.css';

export default class  Login extends Component {
  constructor(props, context) {
    super(props, context);
  }

  async handleLogin() {
    fetch('/auth/google', {
      method: 'GET'
    });
  }

  componentWillMount() {
    document.body.style.backgroundColor = '#B42800';
  }
  componentWillUnmount() {
    document.body.style.backgroundColor = null;
  }

  render() {
    return (
      <MuiThemeProvider>
          <Paper className={'login'} zDepth={5}>
            <div>
              <h1>StudyFriend</h1>
              <h2>Welcome to the dynamic revision planner!</h2>
              <a href="/auth/google">Sign in with Google</a>
            </div>
           </Paper>
      </MuiThemeProvider>
    );
  }
}
