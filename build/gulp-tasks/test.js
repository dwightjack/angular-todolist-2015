module.exports = function (gulp, $, options) {

    var path = require('path'),
        karma = require('karma'),
        _ = require('lodash'),
        browserSync = require('browser-sync'),
        glob = require('glob'),
        protractor = require('gulp-protractor').protractor,
        webdriver_update = require('gulp-protractor').webdriver_update,
        runSequence = require('run-sequence');

    var webPackConf = require('../gulp-config/webpack.conf')(options),
        karmaConf = {
            configFile: path.join(__dirname, '../gulp-config', 'karma.conf.js'),
            webpack: {
                module: webPackConf.module,
                resolve: {
                    modulesDirectories: ['node_modules'],
                    alias: {
                        app: path.join(process.cwd(), options.assetsPath('src.js'))
                    }
                }
            },
            autoWatch: false,
            singleRun: true
        };

    gulp.task('test:unit', function (done) {
        karma.server.start(karmaConf, done);
    });

    gulp.task('test:unit:bdd', function (done) {

        var conf = _.assign({}, karmaConf, {
            browsers: ['PhantomJS'],
            singleRun: false,
            autoWatch: true
        });

        karma.server.start(conf, done);

    });


    // Download and update the selenium driver
    gulp.task('webdriver_update', webdriver_update);

    gulp.task('test:e2e', ['server'], function (done) {

        var seleniumServerJar = glob.sync('node_modules/protractor/selenium/selenium-server-standalone-*.jar', {
            cwd: process.cwd()
        });

        if (!Array.isArray(seleniumServerJar) || seleniumServerJar.length === 0) {
            done('Selenium server standalone not found run `gulp webdriver_update`');
        }

        gulp.src([options.paths.src.root + '/test/e2e/**/*.spec.js'])
        .pipe(protractor({
            configFile: path.join(__dirname, '../gulp-config', 'protractor.conf.js'),
            args: ['--baseUrl', 'http://127.0.0.1:' + options.hosts.devbox.ports.connect, '--seleniumServerJar', seleniumServerJar[0]]
        }))
        .on('error', function(e) { throw e })
        .on('end', function () {
                browserSync.exit();
                done()
        });
    });

    gulp.task('test', ['default'], function(done) {
        runSequence('test:unit', 'test:e2e', done);
    });

};

