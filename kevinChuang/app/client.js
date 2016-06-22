const angular = require('angular');

var textAdventure = angular.module('textAdventure',[]);
require('./js/game/game.js')(textAdventure);
