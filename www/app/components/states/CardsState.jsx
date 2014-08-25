define(function(require) {

var React = require('react');
var GenericCard = require('jsx!./cards/GenericCard');

var CardsState = React.createClass({
  render: function() {
    var normRep = this.props.normRep;
    var cards = normRep.cards;
    var timeContext = this.props.timeContext;
    return (
      <div key={ normRep.id } className="failure-cards">
        <h3>Cards</h3>
        {
          cards.map(function(card, iCard) {
            return (
              <GenericCard
                index={ iCard }
                timeContext={ timeContext }
                card={ card } />
            );
          })
        }
      </div>
    );
  }
});

return CardsState;

}); // end define
