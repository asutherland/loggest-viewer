define(function(require) {

var React = require('react');
var TimeCell = require('jsx!./TimeCell');

var ConsoleLog = React.createClass({
  render: function() {
    var rep = this.props.normRep.consoleLog;
    var origin = this.props.normRep.origin;
    var levelClasses = 'log-level-cell log-level-cell-' + rep.level;
    return (
      <div key={ this.props.normRep.id } className="log-row">
        <TimeCell
          timeContext={ this.props.timeContext }
          timeStamp={ rep.timeStamp } />
        <span className={ levelClasses }>{ rep.level }</span>
        <span className="log-origin-cell"
          title={rep.filename + ':' + rep.lineNumber + '  ' + rep.functionName}
          >{ origin }</span>
        <span className="log-message-cell">{ rep.message }</span>
      </div>
    );
  }
});

return ConsoleLog;

}); // end define
