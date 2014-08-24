define(function (require) {

var React = require('react');

var VideoPlayer = React.createClass({
  render: function() {
    var inlineStyle = {
      minWidth: this.props.dimensions.width + 'px',
      minHeight: this.props.dimensions.height + 'px'
    };
    return (
      <video className="log-video" style={ inlineStyle }
         src={this.props.url}
         controls="true" preload="auto" />
    );
  },

  componentDidMount: function() {
    var domNode = this.getDOMNode();
    domNode.playbackRate = this.props.playbackRate || 0.5;
  },
});

return VideoPlayer;

});
