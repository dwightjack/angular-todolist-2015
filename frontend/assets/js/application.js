/**
 * Main Application File
 *
 * Use for bootstrapping large application
 * or just fill it with JS on small projects
 *
 */

require('./base/plugins');

var angular = require('angular');

angular.module('todoListApp', [require('angular-resource')])
    .factory('todoService', require('./services/todo'))
    .controller('FormController', require('./controllers/form'))
    .controller('ListController', require('./controllers/list'))
    .controller('MainController', require('./controllers/main'))
    .directive('myProgress', require('./directives/progress'));