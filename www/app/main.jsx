define(function (require) {
'use strict';

var React = require('react');

var fetch = require('./fetch');
var processor = require('./logproc/processor');

var TimeContext = require('./time_context');

var queryString = require('./query_string');

var VideoPlayer = require('jsx!./components/VideoPlayer');
var FailureDetails = require('jsx!./components/FailureDetails');
var LogEntries = require('jsx!./components/LogEntries');

/**
 * Our overall UI.
 *
 * Our layout is:
 * ( video ) ( failure details )
 * (       logs                )
 *
 * If we got fancier
 */
var LogLoader = React.createClass({
  getInitialState: function() {
    var logUrl;
    if (window.location.search) {
      var searchParams = queryString.toObject(
        window.location.search.substring(1));

      if (searchParams.url) {
        logUrl = searchParams.url;
      }
    }
    if (!logUrl) {
      return {
        logUrl: null,
        videoUrl: null,
        logEntries: null
      };
    }

    var videoUrl = logUrl.replace(/\.jsons$/, '.webm');
    return {
      logUrl: logUrl,
      videoUrl: videoUrl,
      blackboard: null,
      logEntries: null,
      timeContext: null
    };
  },

  componentDidMount: function() {
    fetch.fetchJsons(this.state.logUrl)
      .then(processor.transformLogObjs)
      .then(function(transformed) {
        // allow for ~2 frames of video latency
        var videoStartTS = transformed.blackboard.videoStartTS - (2000/30);
        var testStartTS = transformed.blackboard.testStartTS;
        var failureTS = null;
        if (transformed.blackboard.lastFailure) {
          failureTS = transformed.blackboard.lastFailure.raw.timeStamp;
        }

        var timeContext = new TimeContext({
          // there may not be a video.
          startTS: videoStartTS || testStartTS,
          initialTS: failureTS
        });
        this.setState({
          timeContext: timeContext,
          blackboard: transformed.blackboard,
          logEntries: transformed.logs,
          videoDimensions: transformed.blackboard.videoDimensions
        });
      }.bind(this));
  },

  render: function() {
    if (!this.state.logUrl) {
      return (
        <div>
          <h2>We need a URL to find the log at!</h2>
          <div>You should provide a url query param that provides a CORS friendly URL to a .jsons file</div>
        </div>
      );
    }

    if (!this.state.logEntries) {
      return (
        <div>Loading...</div>
      );
    }

    var videoRowStyle = {
      minHeight: this.state.videoDimensions.height,
      maxHeight: this.state.videoDimensions.height
    };
    return (
      <div className="log-viewer-container">
        <div className="log-video-and-failure" style={ videoRowStyle }>
          <VideoPlayer
            url={ this.state.videoUrl }
            timeContext={ this.state.timeContext }
            dimensions={ this.state.videoDimensions }/>
          <FailureDetails
            detailList = { this.state.blackboard.lastFailure.detailList } />
        </div>
        <LogEntries
          entries={ this.state.logEntries }
          timeContext={ this.state.timeContext }/>
      </div>
    );
  }
});

React.renderComponent(<LogLoader />, document.getElementById('content'));

});
