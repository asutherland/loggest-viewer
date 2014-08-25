/**
 * Process raw JSON log objects and allow for extensible-ish processing.
 *
 **/

define(function(require) {

function transformEmailLoggestTiny(normRep, msg, blackboard) {
  if (/^EIA{/.test(msg)) {
    normRep.renderAs = 'email';
    normRep.emailLog =  JSON.parse(msg.substring(3));
  }
  return msg;
}

/**
 * Allows origin-specific logic to transform logged strings into log objects in
 * their own right.  This is currently relevant for the Gaia Email app which
 * outputs the same log string via dump() and console.log() (the latter being
 * for fancy testing.)
 */
var tunneledLogTransformersByOrigin = {
  'app://email.gaiamobile.org': transformEmailLoggestTiny
};

/**
 * The log grabber entries contains the following stuff in them with examples
 * provided:
 * - window: "app://system.gaiamobile.org/index.html"
 * - level: "log"
 * - message: "[WallpaperManager] new wallpaper"
 * - filename: "app://system.gaiamobile.org/js/wallpaper_manager.js"
 * - lineNumber: 346,
 * - functionName:"debug"
 * - timeStamp: 1408504040188
 *
 * We can pass this through
 */
function transformLogGrabberConsoleApi(normRep, blackboard) {
  normRep.renderAs = 'console';
  var logged = normRep.consoleLog = normRep.raw.msg;
  if (!logged.window) {
    return;
  }
  var origin = /^(\w+:\/\/[^/]+)/.exec(logged.window)[1];
  normRep.origin = origin;

  var handler = tunneledLogTransformersByOrigin[origin];
  if (handler) {
    handler(normRep, logged.message, blackboard);
  }
}

// function@file:line
var SM_STACK_FORMAT = /^(.*)@(.+):(\d+)$/;
// object-functiony-thing at (file:line:col)
var NODE_STACK_FORMAT = /^ +at ([^ ]+) \(([^:]+):(\d+):\d+\)$/;
function transformException(exObj) {
  var frames = [];
  var stackString = exObj.stack;
  var transformed = {
    name: exObj.name,
    message: exObj.message,
    frames: frames,
    stackString: stackString
  };
  var sframes = stackString.split("\n"),match;
  for (var i = 0; i < sframes.length; i++) {
    // (Note that for the node case right now the message ends up on the top
    // line and we will ignore it.)
    if ((match = SM_STACK_FORMAT.exec(sframes[i])) ||
        (match = NODE_STACK_FORMAT.exec(sframes[i]))) {
      frames.push({
        filename: match[2],
        lineNo: match[3],
        funcName: match[1],
      });
    }
  }
  return transformed;
}

function transformCardsFailure(rawCards, allDetails) {
  var cards = rawCards.map(function(rawCard, iCard) {
    return {
      id: iCard,
      type: rawCard.type,
      mode: rawCard.mode,
      state: rawCard.state,
      error: rawCard.error ? transformException(rawCard.error) : null
    };
  });
  return {
    id: 'cards',
    renderAs: 'cards',
    cards: cards
  };
}

var testFailureTransformersByKey = {
  cards: transformCardsFailure
};

/**
 * The failure log is a hodge-podge of stuff cramming their data into a single
 * object.
 */
function transformTestFailureLog(normRep, blackboard) {
  var details = normRep.raw.details;
  normRep.renderAs = 'failure';
  var detailList = normRep.detailList = [];
  for (var key in details) {
    var data = details[key];
    var handler = testFailureTransformersByKey[key];
    if (handler) {
      try {
        detailList.push(handler(data, details));
      }
      catch(ex) {
        console.warn('Handler unhappiness on', data, 'ex:', ex);
      }
    }
    else {
      detailList.push({
        id: key,
        renderAs: 'unknown',
        raw: data
      });
    }
  }
  blackboard.lastFailure = normRep;
}

/**
 * Explicit actions logged by the tests.
 */
function transformTestAction(normRep, blackboard) {
  normRep.renderAs = 'action';
}

function transformTestStart(normRep, blackboard) {
  blackboard.testStartTS = normRep.raw.startTS;
}

/**
 * Logged when the ~first frame of video is captured, providing us with both the
 * relative path of the video and the timestamp that should ideally correspond
 * very closely to the start of the video.
 */
function transformTestVideo(normRep, blackboard) {
  var raw = normRep.raw;
  blackboard.videoPath = raw.videoPath;
  blackboard.videoStartTS = raw.startTS;
  blackboard.videoDimensions = {
    width: raw.width,
    height: raw.height
  };
  // leave the normRep displaying this as unknown; we don't need a special type.
}

/**
 *
 */
var recordedLogMapSourceAndType = {
  'client-log': transformLogGrabberConsoleApi,
  'test-failureLog': transformTestFailureLog,
  'test-start': transformTestStart,
  'test-testAction': transformTestAction,
  'test-video': transformTestVideo
};

/**
 *
 */
function transformLogObjs(objs) {
  var unknownMapKeyCounts = {};
  var blackboard = {};
  var transformedObjs = objs.map(function(obj, index) {
    var mapkey = obj.source + '-' + obj.type;
    var handler = recordedLogMapSourceAndType[mapkey];
    var normRep = {
      id: index,
      renderAs: 'unknown',
      raw: obj
    };
    // Shared blackboard for building notable indices/aggregates or stashing
    // important probably-singleton pieces of data, like when the video starts.
    if (!handler) {
      if (!unknownMapKeyCounts[mapkey]) {
        unknownMapKeyCounts[mapkey] = 1;
      }
      else {
        unknownMapKeyCounts[mapkey]++;
      }
      return normRep;
    }
    try {
      handler(normRep, blackboard);
    }
    catch(ex) {
      console.error('handler error', ex.message, ex.stack, 'on', obj);
    }
    return normRep;
  });

  if (Object.keys(unknownMapKeyCounts).length) {
    console.warn('Encountered some unknown log types:', unknownMapKeyCounts);
  }
  return {
    blackboard: blackboard,
    logs: transformedObjs
  };
}

return {
  transformLogObjs: transformLogObjs
};

}); // end define
