define(function (require) {

var React = require('react');

var VideoPlayer = React.createClass({
  render: function() {
    return <video src={this.props.url} />;
  }
});

return VideoPlayer;

});
