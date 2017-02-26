import React, { PropTypes, Component } from 'react';

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
    if (!this.state.topicName || this.state.topicName == ' ') {
      return;
    }
    this.props.listChange(this.state.topicName);
  }
  render() {
    return (<div>
      <input type="text" value={this.state.topicName} onChange={(event)=> {this.handleChange(event);}}/>
      <button onClick={(event)=> {this.onAdd(event);}}>+</button>
    </div>);
  }
}
