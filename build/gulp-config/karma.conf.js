module.exports = function(config) {

    var path = require('path');

    config.set({
        browsers: ['Chrome'],
        frameworks: ['jasmine'],
        reporters: ['spec'],
        basePath: process.cwd(),
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'frontend/test/unit/**/*.spec.js'
        ],

        webpackMiddleware: {
            stats: {
                chunkModules: false,
                colors: true
            }
        },

        preprocessors: {
            'frontend/test/unit/**/*.spec.js': ['webpack']
        },
        //
        //captureTimeout: 60000,
        //browserNoActivityTimeout: 60000,

        plugins: [
            'karma-webpack',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-spec-reporter'
        ]
    });
};
