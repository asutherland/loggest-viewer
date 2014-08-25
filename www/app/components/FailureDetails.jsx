define(function (require) {

var React = require('react');
var ReactList = require('react-list');

var stateFactory = require('jsx!./states/registry').stateFactory;

var FailureDetails = React.createClass({
  render: function() {
    return (
      <div className="failure-details">
        <h2>Failed!  Details:</h2>
        <ReactList className="failure-details-list"
          items={ this.props.detailList }
          renderItem={ stateFactory.bind(null, this.props.timeContext) }
          uniform={ false }
          />
      </div>
    );
  }
});

return FailureDetails;

});
