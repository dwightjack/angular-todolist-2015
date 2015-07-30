module.exports = function (options) {

    var path = require('path'),
        glob = require('glob'),
        cwd = path.join(process.cwd(), options.assetsPath('src.js')),
        srcPath = path.join(process.cwd(), options.assetsPath('src.js')),
        destPath = path.join(options.assetsPath('dist.js'));

    var entries = {};

    glob.sync('*.js', {
        cwd: cwd
    }).forEach(function (filename) {
        var key = path.basename(filename, '.js');
        entries[key] = './' + filename;
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
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|assets\/vendors)/,
                    loader: 'babel-loader',
                    query: {
                        optional: ['runtime', 'strict'],
                        loose: 'all'
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