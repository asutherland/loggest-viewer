/**
 *
 **/

define(function(require) {

var renderTypeToWidget = {
  'console': require('jsx!./ConsoleLog'),
  'email': require('jsx!./EmailLog'),
  'failure': require('jsx!./FailureLog'),
  'unknown': require('jsx!./UnknownLog')
};

function logFactory(normRep) {
  var renderer = renderTypeToWidget[normRep.renderAs];
  if (!renderer) {
    console.warn('No renderer', normRep.renderAs, 'found');
    renderer = renderTypeToWidget['unknown'];
  }

  return renderer({ normRep: normRep });
};

return {
  logFactory: logFactory
};

}); // end define
