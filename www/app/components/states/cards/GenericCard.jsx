define(function(require) {

var React = require('react');

var GenericCard = React.createClass({
  render: function() {
    var card = this.props.card;
    var state = card.state || {};
    return (
      <div key={ card.id } className="failure-generic-card">
        <span className="card-index">{ card.id }: </span>
        <span className="card-type">{ card.type }: </span>
        <span className="card-mode">{ card.mode }: </span>
        {
          Object.keys(state).map(function(key) {
            return (
              <span key={key} className="failure-keyvalue-cell"
                ><span className="failure-key-subcell">{key}</span> <span
                  className="failure-value-subcell">{state[key]}</span></span>
            );
          })
        }
        { card.error ? <div className="card-error"
                              title={card.error.stackString}> {card.error.message}</div> :
                              null }
      </div>
    );
  }
});

return GenericCard;

}); // end define
