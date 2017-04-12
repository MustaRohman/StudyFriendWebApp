import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
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
    code: '',
    open: false,
    loading: false
  }


  async handleLogin(event) {
    this.setState({
      loading: true
    });
    fetch('/code', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Code': this.state.code
      },
    }).then((response) => {
      return response.text();
    }).then((text) => {
      if (text === 'true') {
        console.log('Correct code');
        browserHistory.push('/create');
      } else {
        console.log('Incorrect code');
        this.setState({
          open: true,
          loading: false
        });
      }
    }).catch((err) => {
      console.log('Error');
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

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary
        onTouchTap={this.handleClose}
      />,
    ];
    return (
      <MuiThemeProvider>
        {this.state.loading ?
          <CircularProgress className={'login'} size={200} thickness={9} /> :
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
                  <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>
                    Incorrect Code. Please check your Alexa mobile app
                  </Dialog>
              </div>
            </Paper>
         }
      </MuiThemeProvider>
    );
  }
}
