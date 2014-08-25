define(function(require) {

var React = require('react');
var TimeCell = require('jsx!./TimeCell');

var FailureLog = React.createClass({
  render: function() {
    var timeStamp = this.props.normRep.raw.timeStamp;
    return (
      <div key={ this.props.normRep.id } className="log-row">
        <TimeCell
          timeContext={ this.props.timeContext }
          timeStamp={ timeStamp } />
        <span className="log-generic-cell">Failure!</span>
      </div>
    );
  }
});

return FailureLog;

}); // end define
