import React, { PropTypes, Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import styles from './style.css';

export default class TopicInputField extends Component {
  static propTypes = {
    listChange: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);

    this.state = {
      topicName: ''
    };
  }

  handleChange(event) {
    this.setState({
      topicName: event.target.value
    });
  }
  onAdd(event) {
    event.preventDefault();
    if (!this.state.topicName || this.state.topicName === ' ') {
      return;
    }
    this.props.listChange(this.state.topicName);
  }
  render() {
    return (
    <div className={'topicinput'}>
      <TextField
        floatingLabelText="Topic Name"
        type="text"
        value={this.state.topicName}
        onChange={(event)=> {this.handleChange(event);}}
      />
    <FlatButton
      label="Add"
      primary
      onTouchTap={(event) => {this.onAdd(event);}}
      />
    </div>);
  }
}
