module.exports = function (config) {

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

        plugins: [
            'karma-webpack',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-coverage'
        ]
    });
};
