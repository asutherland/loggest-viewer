define(function(require) {

var React = require('react');
var TimeCell = require('jsx!./TimeCell');

/**
 * Currently generic email log displaying stuff that just displays the fixed
 * keys and then iterates over the payload keys.
 */
var EmailLog = React.createClass({
  render: function() {
    var elog = this.props.normRep.emailLog;
    return (
      <div key={ this.props.normRep.id } className="log-row">
        <TimeCell
          timeContext={ this.props.timeContext }
          timeStamp={ elog.ts } />
        <span className="log-thread-cell">{ elog.c }</span>
        <span className="log-level-cell">{ elog.l }</span>
        <span className="log-name-cell"> { elog.w }</span>
        { Object.keys(elog).map(function(key) {
            switch (key) {
              case 'ts':
              case 'c':
              case 'l':
              case 'w':
                return null;
              default:
                return (
                  <span key={key} className="log-generic-cell"
                    >{key}: {elog[key]}</span>
                );
            }
          })}
      </div>
    );
  }
});

return EmailLog;

}); // end define
