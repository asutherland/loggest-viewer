define(function (require) {
'use strict';

var React = require('react');

var Router  = require('react-router');

var fetcher = require('./fetcher');
var processor = require('./logproc/processor');

var VideoPlayer = require('jsx!./components/VideoPlayer');
var LogEntries = require('jsx!./components/LogEntries');

/**
 * Show a loading message until we've
 */
var LogLoader = React.createClass({
  mixins: [ Router.AsyncState ],

  statics: {
    getInitialAsyncState: function(params, query, setState) {
      var logUrl = query.url;
      if (!logUrl) {
        return {
          logUrl: null,
        };
      }

      var videoUrl = logUrl.replace(/\.jsons$/, '.webm');
      var transformedLogs = fetcher.fetchJsons(logUrl)
                              .then(processor.transformLogObjs);
      return {
        logUrl: logUrl,
        videoUrl: videoUrl,
        logEntries: transformedLogs
      };
    }
  },

  render: function() {
    if (this.state.logUrl) {
      return (
        <div>
          <h2>We need a URL to find the log at!</h2>
          <div>You should provide a url query param that provides a CORS friendly URL to a .jsons file</div>
        </div>
      );
    }

    return (
      <div>
        <VideoPlayer url={this.state.logUrl} />
        <LogEntries entries={this.state.logEntries} />
      </div>
    );
  }
});

var routes = (
  <Routes>
    <Route handler={LogLoader}/>
  </Routes>
);

React.renderComponent(routes, document.getElementById('content'));

});
