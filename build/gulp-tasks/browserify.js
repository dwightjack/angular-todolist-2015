/**
 * JavaScript Related Task
 * ===============================
 */

module.exports = function (gulp, $, options) {

    var _ = require('lodash');
    var path = require('path');
    var watchify = require('watchify');
    var browserify = require('browserify');
    var source = require('vinyl-source-stream');
    var buffer = require('vinyl-buffer');
    var glob = require('glob');
    var es = require('event-stream');
    var babelify = require("babelify");


    function bundler (entry, bundle) {

        return bundle
            .bundle()
            .on('error', $.util.log.bind($.util, 'Browserify Error'))
            .pipe(source(entry))
            .pipe(buffer())
            //.pipe($.sourcemaps.init({loadMaps: true}))
            //.pipe($.sourcemaps.write('./'))
            .pipe(gulp.dest(options.assetsPath('dist.js')));
    }


    gulp.task('browserify', function (done) {
        glob('*.js', {
            cwd: path.join(process.cwd(), options.assetsPath('src.js'))
        }, function(err, files) {
            if(err) {
                done(err);
            }

            var tasks = files.map(function (entry) {
                var opts = _.assign({ entries: [options.assetsPath('src.js', entry)], debug: false }, watchify.args);
                var b = browserify(opts);
                var bundle = options.isWatching ? watchify(b) : b;
                bundle.transform(babelify.configure({
                    loose: 'all'
                }));
                if (options.isWatching) {
                    bundle.on('update', function () {
                        return bundler(entry, bundle);
                    });
                }

                return bundler(entry, bundle);
            });

            es.merge(tasks).on('end', done);
        });
    });

};