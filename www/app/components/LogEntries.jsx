define(function (require) {

var React = require('react');
var ReactList = require('react-list');

var logFactory = require('js!./logs/registry');

var LogEntries = React.createClass({
  render: function() {
    return (
      <ReactList
        items={this.props.entries}
        renderItem={logFactory}
        />
    );
  }
});

return LogEntries;

});
