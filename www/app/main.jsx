define(function (require) {
'use strict';

var React = require('react');

var fetch = require('./fetch');
var processor = require('./logproc/processor');

var TimeContext = require('./time_context');

var queryString = require('./query_string');

var VideoPlayer = require('jsx!./components/VideoPlayer');
var LogEntries = require('jsx!./components/LogEntries');

/**
 * Show a loading message until we've
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
      blackboard: {},
      logEntries: [],
      timeContext: null
    };
  },

  componentDidMount: function() {
    fetch.fetchJsons(this.state.logUrl)
      .then(processor.transformLogObjs)
      .then(function(transformed) {
        var videoStartTS = transformed.blackboard.videoStartTS;
        var testStartTS = transformed.blackboard.testStartTS;
        var timeContext = new TimeContext({
          // there may not be a video.
          startTS: videoStartTS || testStartTS
        });
        this.setState({
          timeContext: timeContext,
          blackboard: transformed.blackboard,
          logEntries: transformed.logs
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

    return (
      <div>
        <VideoPlayer
          url={ this.state.videoUrl }
          timeContext={ this.state.timeContext }/>
        <LogEntries
          entries={ this.state.logEntries }
          timeContext={ this.state.timeContext }/>
      </div>
    );
  }
});

React.renderComponent(<LogLoader />, document.getElementById('content'));

});
