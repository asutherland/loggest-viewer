define(function (require, exports, module) {
var URLStore = require('../stores/URLStore');

function goBack() {
  URLStore.back();
}

module.exports = goBack;

});