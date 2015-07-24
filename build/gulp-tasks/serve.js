/**
 * Development Server Task
 * ===============================
 */


var browserSync = require('browser-sync');

module.exports = function (gulp, $, options) {

    var paths = options.paths,
        assetsPath = options.assetsPath,
        ports = options.hosts.devbox.ports,
        reload = options.livereload ? browserSync.reload : function () {},
        browserSyncConfig;


    browserSyncConfig = {
        watchTask: true,
        notify: false,
        port: ports.connect,
        ui: {
            port: 3001,
            weinre: {
                port: ports.weinre
            }
        },
        server: {
            baseDir: options.paths.dist.root
        },
        snippetOptions: {
            async: true,
            whitelist: [],
            blacklist: [],
            rule: {
                match: /<\/head[^>]*>/i,
                fn: function (snippet, match) {
                    return ['<!--[if (gt IE 9) | (IEMobile)]><!-->', snippet, '<!--<![endif]-->', match].join("\n");
                }
            }
        }
    };

    if (!options.livereload) {
        browserSyncConfig.ghostMode = false;
        browserSyncConfig.ui = false;
        browserSyncConfig.snippetOptions.rule.fn = function (snippet, match) {
            return match;
        };
    }

    // Watch Files For Changes & Reload
    gulp.task('serve', ['default'], function () {

        options.isWatching = true;

        browserSyncConfig.middleware = require('./lib/middlewares')(options);

        browserSync.init(null, browserSyncConfig, function () {

            gulp.watch([
                assetsPath('src.sass', '/**/*.{scss,sass}') ,
                '!' + assetsPath('src.sass', '**/*scsslint_tmp*.{sass,scss}') //exclude scss lint files
            ], ['styles']);
            gulp.watch([assetsPath('src.images', '**/*.{png,jpg,gif,svg,webp}')], ['images', reload]);
            gulp.watch([assetsPath('src.fonts', '**/*.{eot,svg,ttf,woff,woff2}')], ['fonts', reload]);
            gulp.watch([assetsPath('src.video', '{,*/}*.*'), assetsPath('src.audio', '{,*/}*.*')], ['media', reload]);
            gulp.watch([
                    paths.src.views + '/{,*/}' + options.viewmatch,
                    paths.src.documents + '/*.md',
                    paths.src.fixtures + '/*.json'
                ],
                ['views', reload]
            );

            //webpack watch
            var scriptTask = require('./scripts')(gulp, $, options);
            scriptTask().pipe(browserSync.stream({match: '**/*.js'}));

        });


    });
};

