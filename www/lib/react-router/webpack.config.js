define(function (require, exports, module) {var __filename = module.uri, __dirname = __filename.substring(0, __filename.lastIndexOf('/');
var path = require('path');
var fs = require('fs');

function buildEntries() {
  return fs.readdirSync('examples').reduce(function(entries, dir) {
    if (dir === 'build') {
      return entries;
    }
    var isDraft = dir.charAt(0) === '_';
    if (!isDraft && fs.lstatSync(path.join('examples', dir)).isDirectory()) {
      entries[dir] = './examples/'+dir+'/'+'app.js';
    }
    return entries;
  }, {});
}

module.exports = {
  entry: buildEntries(),

  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    path: path.join(__dirname, 'examples', 'build'),
    publicPath: '../build/'
  },

  module: {
    loaders: [
      {test: /\.js$/, loader: 'jsx-loader'}
    ]
  }
};


});