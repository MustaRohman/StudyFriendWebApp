const React = require('react');
const ReactDOM = require('react-dom');


const Greeter = React.createClass({
  render: function() {
    return (
      <div>
          <h1>This is a React App!</h1>
          <p>Here is a p tag!</p>
      </div>
    );
  }
});


ReactDOM.render(
  <Greeter/>,
  document.getElementById('app')
);
