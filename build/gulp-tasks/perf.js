/**
 * Performance Related Task
 * ===============================
 */

module.exports = function (gulp, $, options) {

    var browserSync = require('browser-sync'),
        runSequence = require('run-sequence');

    gulp.task('psi', function () {
        var psi = require('psi');

        return psi.output(options.hosts.devbox._tunnel, {
            nokey: 'true',
            strategy: 'desktop'
        }, function () {
            browserSync.exit();
        });
    });


    gulp.task('perf', function (done) {
        //performance test in production build only
        options.production = true;
        runSequence(['default', 'server:tunnel'], 'psi', done);
    });


};