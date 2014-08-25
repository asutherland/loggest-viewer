define(function(require) {

var React = require('react');
var GenericCard = require('jsx!./cards/GenericCard');

var UnknownState = React.createClass({
  render: function() {
    var obj = this.props.normRep.raw;
    return (
      <div key={ this.props.normRep.id } className="failure-unknown">
        <h3>Unknown failure state, with key { this.props.normRep.id }</h3>{
        Object.keys(obj).map(function(key) {
          return (
            <span key={key} className="failure-keyvalue-cell"
              ><span className="failure-key-subcell">{key}</span> <span
                className="failure-value-subcell">{obj[key]}</span></span>
          );
        })
      }</div>
    );
  }
});

return UnknownState;

}); // end define
