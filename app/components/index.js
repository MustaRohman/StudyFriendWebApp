import React from 'react';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import styles from './main.css';

const activeStyle = {
  color: 'white'
};

export default class Main extends React.Component {

  state = {
    open: false
  }
  handleTouchTap = (event) => {
      // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title={<span style={styles.title}>StudyFriend</span>}
            onLeftIconButtonTouchTap={(event) => {this.handleTouchTap(event);}}
          />
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={() => {this.handleRequestClose();}}>
            <Menu>
              <MenuItem primaryText="Create Timetable" />
              <MenuItem primaryText="View Timetables" />
            </Menu>
          </Popover>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}
