import React from 'react';


const TimetableForm = React.createClass({
  getDefaultProps: function() {
    return {
      value: 'Name'
    };
  },
  getInitialState: function() {
    return {
      value: this.props.name
    };
  },
  handleChange(event) {
   this.setState({value: event.target.value});
  },
  handleSubmit(event) {
   alert('A name was submitted: ' + this.state.value);
   event.preventDefault();
  },
  render: function() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
});

module.exports = TimetableForm;
