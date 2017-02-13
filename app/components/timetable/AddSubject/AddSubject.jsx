import React from 'react';
import TopicList from 'TopicList';

const AddSubject = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Add Subjects</h2>
        <label>
          <p>Subject Name:</p>
          <input type="text"/>
        </label>
        <label>
          <p>Topic Duration (Hours):</p>
          <input type="number"/>
        </label>
        <h3>Topics</h3>
        <TopicList/>
      </div>
    );
  }
});

module.exports = AddSubject;
