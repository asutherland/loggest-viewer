/**
 * Process raw JSON log objects and allow for extensible-ish processing.
 *
 **/

define(function(require) {

function transformEmailLoggestTiny(normRep, msg) {
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
function transformLogGrabberConsoleApi(normRep) {
  normRep.renderAs = 'console';
  var logged = normRep.consoleLog = normRep.raw.msg;
  if (!logged.window) {
    return;
  }
  var origin = /^(\w+:\/\/[^/]+)/.exec(logged.window)[1];
  normRep.origin = origin;

  var handler = tunneledLogTransformersByOrigin[origin];
  if (handler) {
    handler(normRep, logged.message);
  }
}

function transformCardsFailure(rawCards, allDetails) {
  var cards = rawCards.map(function(rawCard) {
    // TODO: normalize/transform the exception in the error case.
    return rawCard;
  });
  return {
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
function transformTestFailureLog(normRep) {
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
        renderAs: 'unknown',
        raw: data
      });
    }
  }
}

/**
 *
 */
var recordedLogMapSourceAndType = {
  'client-log': transformLogGrabberConsoleApi,
  'test-failureLog': transformTestFailureLog
};

/**
 *
 */
function transformLogObjs(objs) {
  var unknownMapKeyCounts = {};

  var transformedObjs = objs.map(function(obj) {
    var mapkey = obj.source + '-' + obj.type;
    var handler = recordedLogMapSourceAndType[mapkey];
    var normRep = {
      renderAs: 'unknown',
      raw: obj
    };
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
      handler(normRep);
    }
    catch(ex) {
      console.error('handler error', ex.message, ex.stack, 'on', obj);
    }
    return normRep;
  });

  if (Object.keys(unknownMapKeyCounts).length) {
    console.warn('Encountered some unknown log types:', unknownMapKeyCounts);
  }
  return transformedObjs;
}

return {
  transformLogObjs: transformLogObjs
};

}); // end define
