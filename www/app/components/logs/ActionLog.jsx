define(function(require) {

var React = require('react');
var TimeCell = require('jsx!./TimeCell');

/**
 * Human-friendly description of some action being taken by the test, probably
 * written by the author of the test as opposed to automatic gibberish.
 */
var ActionLog = React.createClass({
  render: function() {
    var raw = this.props.normRep.raw;
    return (
      <div key={ this.props.normRep.id } className="log-row">
        <TimeCell
          timeContext={ this.props.timeContext }
          timeStamp={ raw.timeStamp } />
        <span className="log-action-cell">
          <span className="log-action-label">Action</span> { raw.action }</span>
      </div>
    );
  }
});

return ActionLog;

}); // end define
