
var getData = require('./getData');
var getGame = require('./getGame');
var getGames = require('./getGames');
var getGenres = require('./getGenres');
var getPlatform = require('./getPlatform');
var getPlatforms = require('./getPlatforms');
var searchGames = require('./searchGames');

module.exports = [].concat(getData, getGame, getGames, getGenres, getPlatforms, getPlatform, searchGames);