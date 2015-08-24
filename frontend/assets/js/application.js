/**
 * Main Application File
 *
 * Use for bootstrapping large application
 * or just fill it with JS on small projects
 *
 */

import angular from 'angular';
import ngResource from 'angular-resource';
import ngAnimate from 'angular-animate';

import './base/plugins';

import appStore from './services/store';
import todoApiService from './services/todo-api';
import todoActionCreator from './services/todo-actions';

import ListController from './layout/list.controller';
import MainController from './layout/main.controller';

import myProgressDirective from './components/progress/progress.directive';
import myTodoDirective from './components/todo/todo.directive';
import myFormDirective from './components/form/form.directive';

import todoItemAnimation from './components/todo/todo.animation';

let todoListApp;

todoListApp = angular.module('todoListApp', [ngResource, ngAnimate])
    .factory('todoApiService', todoApiService)
    .factory('appStore', appStore)
    .factory('todoActionCreator', todoActionCreator)
    .controller('ListController', ListController)
    .controller('MainController', MainController)
    .directive('myProgress', myProgressDirective)
    .directive('myTodo', myTodoDirective)
    .directive('myForm', myFormDirective)
    .animation('.todo-item', todoItemAnimation);

export default todoListApp;