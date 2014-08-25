define(function(require) {

var evt = require('./evt');

/**
 * It's in charge of time.  It:
 * - Tracks video progress to inform auto-scrolling log displays.
 * - Is what you tell to seek the video to a given point in time (and pause.)
 * - Makes absolute timestamps relative to the start of the test run/video.
 *
 * There are two types of time changes that listeners may care about:
 * - "seekHappened": An explicit seek happened because the user clicked on a
 *   timestamp or messed with the video playback slider or some other
 *   affordance.
 * - "videoProgress" The video played and the timestamp has now changed enough
 *   so that if you're doing some type of synchronized display, then you should
 *   probably update.
 *
 * Use .on("seekHappened", listener) and .on("videoProgress") to get in on that.
 *
 * The video player is expected to use .on('seekRequested') to listen to our
 * demands that it seek.
 */
function TimeContext(opts) {
  this.startTS = opts.startTS;
  this.initialTS = opts.initialTS || this.startTS;
console.log('decided initial is', this.initialTS, 'delta of', this.initialTS - this.startTS);
  this.curTS = 0;

  this._pendingSeekCause = null;
}
TimeContext.prototype = {
  /**
   * Are you some UI code and you want to cause a sync to happen?  Tell us!
   *
   * @param {Number} ts
   *   Absolute milliseconds since epoch timestamp to seek to.
   * @param {String} who
   *   Who are you, bossing us around?  We will include the who in all
   *   objects emitted so you can avoid triggering yourself if you are a UI
   *   affordance.
   */
  seekToTimeStamp: function(ts, who) {
    var relSecs = this.makeRelativeSecs(ts);
    // The seek will result in a seeked notification; so we just need to save
    // off the 'who' to clobber the who that gets reported by the video player
    // widget.
    this._pendingSeekCause = who;
    this.emit('seekRequested', { timeStamp: ts, relSecs: relSecs, who: who });
  },

  /**
   * Notify interested parties that an explicit seek occurred.
   */
  notifySeekOccurred: function(relSecs, who) {
    var ts = this.curTS = this.makeTimestampFromRelSecs(relSecs);
    if (this._pendingSeekCause) {
      who = this._pendingSeekCause;
      this._pendingSeekCause = null;
    }
    this.emit('seekHappened', { timeStamp: ts, relSecs: relSecs, who: who });
  },

  notifyVideoProgress: function(relSecs) {
    var ts = this.makeTimestampFromRelSecs(relSecs);
    this.emit('videoProgress', { timeStamp: ts, relSecs: relSecs });
  },

  makeRelativeSecs: function(ts) {
    var delta = ts - this.startTS;
    return delta / 1000;
  },

  makeTimestampFromRelSecs: function(relSecs) {
    return this.startTS + relSecs * 1000;
  }
};
evt.mix(TimeContext.prototype);

return TimeContext;

}); // end define
