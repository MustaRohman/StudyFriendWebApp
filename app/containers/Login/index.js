import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import styles from './style.css';

const styles2 = {
  errorStyle: {
    color: orange500,
  },
  underlineStyle: {
    borderColor: '#B42800'
  },
  floatingLabelStyle: {
    color: orange500,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
};

export default class  Login extends Component {
  constructor(props, context) {
    super(props, context);
  }

  state = {
    code: ''
  }

  async handleLogin(event) {
    fetch('/code', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Code': this.state.code
      },
    });
  }

  handleChange(event) {
    this.setState({
      code: event.target.value
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
              <h2>Dynamic Revision Planner for Amazon Echo</h2>
                <TextField
                  hintText="Enter Code Here"
                  underlineStyle={styles2.underlineStyle} value={this.state.code}
                  onChange={(event) => {this.handleChange(event);}} />
                <RaisedButton label="Enter" fullWidth
                  primary onTouchTap={(event) => {this.handleLogin(event);}}/>
            </div>
           </Paper>
      </MuiThemeProvider>
    );
  }
}
