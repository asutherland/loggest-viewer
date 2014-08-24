define(function (require) {

var React = require('react');

var VideoPlayer = React.createClass({
  render: function() {
    return (
      <video src={this.props.url}
         controls="true" preload="auto"/>
    );
  },

  componentDidMount: function() {
    var domNode = this.getDOMNode();
    domNode.playbackRate = this.props.playbackRate || 0.5;
  }
});

return VideoPlayer;

});
