/**
 *
 **/

define(function(require) {

var renderTypeToWidget = {
  'cards': require('jsx!./CardsState'),
  'unknown': require('jsx!./UnknownState')
};

function stateFactory(normRep) {
  var renderer = renderTypeToWidget[normRep.renderAs];
  if (!renderer) {
    console.warn('No renderer', normRep.renderAs, 'found');
    renderer = renderTypeToWidget['unknown'];
  }

  return renderer({ rep: normRep });
};


return {
  stateFactory: stateFactory
};

}); // end define
