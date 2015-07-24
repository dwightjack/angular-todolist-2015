/**
 * JavaScript Related Task
 * ===============================
 */

module.exports = function (gulp, $, options) {

    var named = require('vinyl-named'),
        webpackStream = require('webpack-stream'),
        srcPath = options.assetsPath('src.js'),
        destPath = options.assetsPath('dist.js');

    if (options.production) {
        destPath = destPath.replace(options.paths.dist.root, options.paths.tmp);
    }

    var webpackConfig = {
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|assets\/vendors)/,
                    loader: 'babel-loader',
                    query: {
                        loose: 'all'
                    }
                }
            ]
        }
    };

    function task() {

        if (options.isWatching) {
            webpackConfig.watch = true;
        }
        if (!options.production) {
            //webpackConfig.devtool = '#eval-source-map';
            //webpackConfig.debug = true;
        }

        return gulp.src([srcPath +  '/*.js'])
            .pipe($.plumber({
                errorHandler: $.notify.onError('Error: <%= error.message %>')
            }))
            .pipe(named())
            .pipe(webpackStream(webpackConfig))
            .pipe(gulp.dest(destPath))
            .pipe($.if(options.isWatching, $.notify({ message: 'Scripts Compiled'})))
            .pipe($.size({title: 'scripts'}));
    }

    gulp.task('scripts', task);

    return task;
};


