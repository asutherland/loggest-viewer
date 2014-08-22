/**
 *
 **/

define(function(require) {

var React = require('react');

var ConsoleLog = React.createClass({
  render: function() {
    var rep = this.props.normRep.consoleLog;
    return (
      <div class="log-row">
        <div class="log-time-cell">{ rep.timeStamp }</div>
        <div class="log-level-cell">{ rep.level }</div>
        <div class="log-window-cell">{ rep.window }</div>
        <div class="log-cell-clump">
          <div class="log-filename-cell">{ rep.filename }</div>
          <div class="log-lineNumber-cell">{ rep.lineNumber }</div>
        </div>
        <div class="log-functionName-cell">{ rep.lineNumber }</div>
        <div class="log-message-cell">{ rep.message }</div>
      </div>
    );
  }
});

return ConsoleLog;

}); // end define
