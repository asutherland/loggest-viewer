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
      <div key={ this.props.normRep.id } className="log-row">{
        Object.keys(obj).map(function(key) {
          return (
            <span key={key} className="log-keyvalue-cell"
              ><span className="log-key-subcell">{key}</span> <span
                className="log-value-subcell">{obj[key]} </span></span>
          );
        })
      }</div>
    );
  }
});

return UnknownLog;

}); // end define
