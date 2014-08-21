define(function (require) {
'use strict';

var React = require('react');

var Router  = require('react-router');

var fetcher = require('./fetcher');
var normalizer = require('./normalizer');

var VideoPlayer = require('jsx!./components/VideoPlayer');
var LogEntries = require('jsx!./components/LogEntries');

/**
 * Show a loading message until we've
 */
var LogLoader = React.createClass({
  mixins: [ Router.AsyncState ],

  statics: {
    getInitialAsyncState: function(params, query, setState) {
      return {
        logs:
      }
    }
  },

  render: function() {


    return (
      <div>
        <VideoPlayer />
        <LogEntries />
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
