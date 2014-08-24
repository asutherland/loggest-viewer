define(function(require) {

var React = require('react');

var FailureLog = React.createClass({
  render: function() {
    return (
      <div key={ this.props.normRep.id } className="log-row">
        <span className="log-generic-cell">Failure!</span>
      </div>
    );
  }
});

return FailureLog;

}); // end define
