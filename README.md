AngularJS Sample Todolist
================

A sample todolist in AngularJS

##Features

Everything you get with [wok/gulp](https://github.com/fevrcoding/wok/tree/feature/gulp) plus:

* Angular 1.4
* Webpack
* ES6 (with babel)
* ESLint
* Karma + Protractor testing
* [NeDB](https://github.com/louischatriot/nedb) powered sample database

##Requirements

* [Node.js](http://nodejs.org/) v0.12.0+
* [Gulp](http://gulpjs.com/)  (`npm install gulp -g`)
* [Bower](http://bower.com/)  (`npm install bower -g`)

##Getting started


1) clone this repo:

	git clone https://github.com/dwightjack/angular-todolist-2015.git

2) cd into it:

	cd angular-todolist-2015

3) install dependencies:

	npm install
	bower install

4) run the built-in server:

	gulp serve
	
##Gulp Tasks

* `gulp serve`: default development task
* `gulp serve --bdd`: default development task plus continuous testing with Karma + Jasmine + PhantomJS
* `gulp test[:unit|:e2e] `: build in development and launch unit and/or e2e test in Chrome. To test production builds (will work just for just e2e testing ) add the `--production` flag
* `gulp server`: just a static server