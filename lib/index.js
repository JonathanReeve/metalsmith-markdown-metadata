var markdown = require('markdown-it')();

/**
 * Expose `plugin`.
 */

module.exports = plugin;

function deepMap(obj, iterator) {
    Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === "object") {
            // Eliminate null
            if (obj[key]) {
                deepMap(obj[key], iterator);
            }
        } else {
            obj[key] = iterator(obj[key]);
        }
    });
}

function plugin(opts){
  opts = opts || {};

  return function(files, metalsmith, done){
    console.log('Metadata before: ') 
    console.log(metalsmith.metadata()) 
    deepMap(metalsmith.metadata(), (m) => markdown.renderInline(m))
    console.log('Metadata after: ') 
    console.log(metalsmith.metadata()) 

    done();
  }
};
