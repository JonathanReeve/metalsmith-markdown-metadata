var markdown = require('markdown-it')();
var _ = require('lodash'); 

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Supported metadata parsers.
 */


function deepMap(obj, iterator) {
  return _.transform(obj, (result, val, key) => {
    result[key] = _.isObject(val) ? deepMap(val, iterator) : iterator(val)
  })
}

function plugin(opts){
  opts = opts || {};

  return function(files, metalsmith, done){
    var metadata = metalsmith.metadata();
   
    console.log('Metadata before: ') 
    console.log(metadata) 
    metadata = deepMap(metadata, (m) => markdown.renderInline(m))
    console.log('Metadata after: ') 
    console.log(metadata) 

    done();
  }
};
