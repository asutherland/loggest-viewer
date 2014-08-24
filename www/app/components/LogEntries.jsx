define(function (require) {

var React = require('react');
var ReactList = require('react-list');

var logFactory = require('jsx!./logs/registry').logFactory;

var LogEntries = React.createClass({
  render: function() {
    return (
      <ReactList
        items={this.props.entries}
        renderItem={ logFactory.bind(null, this.props.timeContext) }
        />
    );
  }
});

return LogEntries;

});
