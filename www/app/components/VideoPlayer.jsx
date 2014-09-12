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
         controls="true" preload="auto" autoplay="false" />
    );
  },

  componentDidMount: function() {
    var player = this.getDOMNode();
    var timeContext = this.props.timeContext;
    player.playbackRate = this.props.playbackRate || 0.5;
    var initialSeek = function() {
      var seekTo = timeContext.makeRelativeSecs(timeContext.initialTS);
      console.log('trying to seek to', seekTo);
      player.currentTime = seekTo;
      player.removeEventListener('canplay', initialSeek);
    };
    player.addEventListener('canplay', initialSeek);
    player.addEventListener('seeked', this.onSeeked);
    player.addEventListener('timeupdate', this.onTimeUpdate);

    timeContext.on('seekRequested', this.handleSeekRequest);
  },

  onSeeked: function() {
    var player = this.getDOMNode();
    this.props.timeContext.notifySeekOccurred(player.currentTime, 'user');
  },

  onTimeUpdate: function() {
    var player = this.getDOMNode();
    this.props.timeContext.notifyVideoProgress(player.currentTime);
  },

  handleSeekRequest: function(req) {
    var player = this.getDOMNode();
    player.currentTime = req.relSecs;
  }
});

return VideoPlayer;

});
