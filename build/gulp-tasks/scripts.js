/**
 * JavaScript Related Task
 * ===============================
 */

module.exports = function (gulp, $, options) {

    var _ = require('lodash'),
        webpack = require('webpack');

    var webpackConfig = require('../gulp-config/webpack.conf')(options);


    function compilerTask(done) {

        var callingDone = false;

        if (options.isWatching) {
            webpackConfig.watch = true;
        }

        if (!options.production) {
            webpackConfig.devtool = '#eval-source-map';
            webpackConfig.debug = true;
        } else {
            if (options.production) {
                webpackConfig.plugins.push(
                    new webpack.optimize.DedupePlugin(),
                    new webpack.optimize.UglifyJsPlugin({sourceMap: false}),
                    new webpack.BannerPlugin(
                        _.template(options.banners.application)(options),
                        {entryOnly: true, raw: true}
                    )
                );
            }
        }

        webpack(webpackConfig, function (err, stats) {
            if (err) {
                done(err);
            }
            if (callingDone) {
                return;
            }
            // Debounce output a little for when in watch mode
            if (options.isWatching) {
                callingDone = true;
                setTimeout(function () {
                    callingDone = false;
                }, 500);
            }

            $.util.log((stats || {}).toString({
                colors: $.util.colors.supportsColor,
                hash: false,
                timings: false,
                chunks: false,
                chunkModules: false,
                modules: false,
                children: true,
                version: true,
                cached: false,
                cachedAssets: false,
                reasons: false,
                source: false,
                errorDetails: false
            }));

            if (typeof done === 'function') {
                done();
            }
        });
    }

    gulp.task('scripts', compilerTask);

    return compilerTask;
};


