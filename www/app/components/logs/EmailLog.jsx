define(function(require) {

var React = require('react');

/**
 * Currently generic email log displaying stuff that just displays the fixed
 * keys and then iterates over the payload keys.
 */
var EmailLog = React.createClass({
  render: function() {
    var elog = this.props.normRep.emailLog;
    return (
      <div class="log-row">
        <div class="log-time-cell">{ elog.ts }</div>
        <div class="log-thread-cell">{ elog.c }</div>
        <div class="log-level-cell">{ elog.l }</div>
        <div class="log-name-cell"> { elog.w }</div>
        { elog.keys.map(function(key) {
            switch (key) {
              case 'ts':
              case 'c':
              case 'l':
              case 'w':
                return null;
              default:
                return <div class="log-generic-cell">{key}: {elog[key]}</div>;
            }
          })}
      </div>
    );
  }
});

return EmailLog;

}); // end define
