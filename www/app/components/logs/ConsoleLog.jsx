/**
 *
 **/

define(function(require) {

var React = require('react');

var ConsoleLog = React.createClass({
  render: function() {
    var rep = this.props.normRep.consoleLog;
    return (
      <div className="log-row">
        <span className="log-time-cell">{ rep.timeStamp }</span>
        <span className="log-level-cell">{ rep.level }</span>
        <span className="log-window-cell">{ rep.window }</span>
        <span className="log-cell-clump">
          <span className="log-filename-cell">{ rep.filename }</span>
          <span className="log-lineNumber-cell">{ rep.lineNumber }</span>
        </span>
        <span className="log-functionName-cell">{ rep.lineNumber }</span>
        <span className="log-message-cell">{ rep.message }</span>
      </div>
    );
  }
});

return ConsoleLog;

}); // end define
