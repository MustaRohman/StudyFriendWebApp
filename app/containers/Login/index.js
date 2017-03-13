import React, {Component} from 'react';
import { GoogleLogin } from 'react-google-login-component';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import styles from './style.css';

export default class  Login extends Component {
  constructor(props, context) {
    super(props, context);
  }

  responseGoogle(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    console.log({accessToken: id_token});
    // anything else you want to do(save to localStorage)...
  }

  render() {
    return (
      <MuiThemeProvider>
          <Paper className={'login'} zDepth={2}>
            <div>
              <h1>StudyFriend</h1>
              <h2>Welcome to the dynamic revision planner!</h2>
              <GoogleLogin socialId="375688671713-nlf5vnm3i77latudv441or2nfiu0n9ok.apps.googleusercontent.com"
                           class="google-login"
                           scope="profile"
                           responseHandler={this.responseGoogle}
                           buttonText="Login With Google"
                           className={'google-class'}/>
               </div>
           </Paper>
      </MuiThemeProvider>
    );
  }
}
