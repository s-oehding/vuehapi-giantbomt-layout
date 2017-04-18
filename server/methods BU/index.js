
var getData = require('./getData');
var getCompanies = require('./getCompanies');
var getGame = require('./getGame');
var getGames = require('./getGames');
var getGenres = require('./getGenres');
var getPlatform = require('./getPlatform');
var getPlatforms = require('./getPlatforms');
var searchGames = require('./searchGames');

module.exports = [].concat(getData, getCompanies, getGame, getGames, getGenres, getPlatforms, getPlatform, searchGames);