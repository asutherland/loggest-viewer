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
        <span class="log-time-cell">{ rep.timeStamp }</span>
        <span class="log-level-cell">{ rep.level }</span>
        <span class="log-window-cell">{ rep.window }</span>
        <span class="log-cell-clump">
          <span class="log-filename-cell">{ rep.filename }</span>
          <span class="log-lineNumber-cell">{ rep.lineNumber }</span>
        </span>
        <span class="log-functionName-cell">{ rep.lineNumber }</span>
        <span class="log-message-cell">{ rep.message }</span>
      </div>
    );
  }
});

return ConsoleLog;

}); // end define
