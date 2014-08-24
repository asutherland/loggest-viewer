
define(function(require) {

var React = require('react');

/**
 * Display the contents of an unknown log by just enumerating the keys.  We
 * should potentially do something recursive for nested objects and arrays or
 * do what ArbPL does and just say "object" that you can click on and see the
 * recursive travesal in a pop-up-ish thing.
 */
var UnknownLog = React.createClass({
  render: function() {
    var obj = this.props.normRep.raw;
    return (
      <div class="log-row">{
        obj.keys.map(function(key) {
          return <span class="log-generic-cell">{key}: {obj[key]}</span>;
        })
      }</div>
    );
  }
});

return UnknownLog;

}); // end define
