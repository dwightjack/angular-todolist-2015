/**
 * Development Server Task
 * ===============================
 */


module.exports = function (gulp, $, options) {

    var spawn = require('child_process').spawn,
        browserSync = require('browser-sync');

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

            var compileTask,
                notifier,
                backgroundProcess;

            gulp.watch([
                assetsPath('src.sass', '/**/*.{scss,sass}'),
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
            compileTask = require('./scripts')(gulp, $, options);
            notifier = $.notify({message: 'Scripts Compiled'});


            compileTask(function () {
                notifier.write('completed');
                reload();
            });

            if (options.bdd) {

                backgroundProcess = spawn('node', ['./node_modules/gulp/bin/gulp.js', 'test:unit:bdd'], { stdio: 'inherit', cwd: process.cwd(), env: process.env });

                process.on('exit', function () {
                    backgroundProcess.kill();
                });

                backgroundProcess.on('error', function (e) {
                    new $.util.PluginError('[serve]', e);
                });
            }

        });

    });

    gulp.task('server:tunnel', ['server'], function (done) {
        var ngrok = require('ngrok');
        ngrok.connect(ports.connect, function (err, url) {
            if (err) {
                done(err);
            } else {
                options.hosts.devbox._tunnel = url;
                $.util.log($.util.colors.blue('Tunnel URL set to ' + url));
                done();
            }
        });
    });

    //just a static server
    gulp.task('server', function (done) {

        browserSync.init(null, {
            logLevel: 'silent',
            middleware: require('./lib/middlewares')(options),
            notify: false,
            open: false,
            port: ports.connect,
            server: {
                baseDir: options.paths.dist.root
            },
            ui: false
        }, done);
    });
};

