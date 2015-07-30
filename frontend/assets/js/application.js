/**
 * Main Application File
 *
 * Use for bootstrapping large application
 * or just fill it with JS on small projects
 *
 */

require('./base/plugins');

var angular = require('angular');

var todoListApp = angular.module('todoListApp', [require('angular-resource'), require('angular-animate')])
    .factory('todoService', require('./services/todo'))
    .controller('ListController', require('./layout/list.controller'))
    .controller('MainController', require('./layout/main.controller'))
    .directive('myProgress', require('./components/progress/progress.directive'))
    .directive('myTodo', require('./components/todo/todo.directive'))
    .directive('myForm', require('./components/form/form.directive'))
    .animation('.todo-item', require('./components/todo/todo.animation'));

module.exports = todoListApp;