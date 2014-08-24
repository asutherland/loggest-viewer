define(function(require) {

var React = require('react');
var TimeCell = require('jsx!./TimeCell');

var ConsoleLog = React.createClass({
  render: function() {
    var rep = this.props.normRep.consoleLog;
    return (
      <div key={ this.props.normRep.id } className="log-entry">
        <div className="log-row">
          <TimeCell
            timeContext={ this.props.timeContext }
            timeStamp={ rep.timeStamp } />
          <span className="log-level-cell">{ rep.level }</span>
          <span className="log-window-cell">{ rep.window }</span>
          <span className="log-cell-clump">
            <span className="log-filename-cell">{ rep.filename }</span>
            <span className="log-lineNumber-cell">{ rep.lineNumber }</span>
          </span>
        </div>
        <div className="log-row">
          <span className="log-message-cell">{ rep.message }</span>
        </div>
      </div>
    );
  }
});

return ConsoleLog;

}); // end define
