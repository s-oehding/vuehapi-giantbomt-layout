var defaults = require('./defaults');
var games = require('./games');
var genres = require('./genres');
var platforms = require('./platforms');
var search = require('./search');

module.exports = [].concat(defaults, games, genres, platforms, search);