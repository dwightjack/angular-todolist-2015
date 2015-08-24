module.exports = function (options) {

    var path = require('path'),
        glob = require('glob');

    var cwd = path.join(process.cwd(), options.assetsPath('src.js')),
        destPath = path.join(options.assetsPath('dist.js'));

    var entries = {};

    glob.sync('*.js', {
        cwd: cwd
    }).forEach(function (filename) {
        var key = path.basename(filename, '.js');
        entries[key] = ['babel-core/polyfill', './' + filename];
    });


    return {
        context: cwd,
        entry: entries,
        output: {
            path: path.join(process.cwd(), destPath),
            publicPath: destPath.replace(options.paths.dist.root, '').replace(/\\/g, '/') + '/',
            filename: '[name].js'
        },
        optional: ['runtime'],
        plugins: [],
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|assets\/vendors)/,
                    loader: 'babel-loader',
                    query: {
                        optional: ['strict'],
                        loose: [
                            'es6.arrowFunctions',
                            'es6.blockScoping',
                            'es6.classes',
                            'es6.constants',
                            'es6.forOf',
                            'es6.modules',
                            'es6.parameters',
                            'es6.properties.computed',
                            'es6.properties.shorthand',
                            'es6.tailCall',
                            'es6.templateLiterals',
                            'es6.regex.unicode',
                            'es6.regex.sticky'
                        ]
                    }
                }, {
                    test: /\.html$/,
                    exclude: /(node_modules|assets\/vendors)/,
                    loader: 'raw-loader'
                }
            ]
        }
    };
};