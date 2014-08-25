define(function(require) {

var React = require('react');

/**
 * Log row time cell widget that takes care of relativizing the timestamp and
 * doing any fancy UI tricks we want it to do.  Like seeking the video to the
 * timestamp when clicked upon.
 */
var TimeCell = React.createClass({
  handleClick: function() {
    this.props.timeContext.seekToTimeStamp(this.props.timeStamp);
  },
  render: function() {
    var reltime = this.props.timeContext.makeRelativeSecs(this.props.timeStamp);
    return (
      <span className="log-time-cell"
        onClick={ this.handleClick }
        >{ reltime.toFixed(3) }s</span>
    );
  }
});

return TimeCell;

}); // end define
