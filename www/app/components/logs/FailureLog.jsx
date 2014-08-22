define(function(require) {

var React = require('react');

var FailureLog = React.createClass({
  render: function() {
    return (
      <div class="log-row">
        <div class="log-generic-cell">Failure!</div>
      </div>
    );
  }
});

return FailureLog;

}); // end define
