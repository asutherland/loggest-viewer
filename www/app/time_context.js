define(function(require) {

/**
 * It's in charge of time.  It:
 * - Tracks video progress to inform auto-scrolling log displays.
 * - Is what you tell to seek the video to a given point in time (and pause.)
 * - Makes absolute timestamps relative to the start of the test run/video.
 */
function TimeContext(opts) {
  this.startTS = opts.startTS;
}
TimeContext.prototype = {
  seekToTimeStamp: function(ts) {
  },

  makeRelativeSecs: function(ts) {
    var delta = ts - this.startTS;
    return delta / 1000;
  }
};

return TimeContext;

}); // end define
