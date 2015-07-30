'use strict';

require('babel-core/register');

exports.config = {

    // testing framework, jasmine is the default
    framework: 'jasmine2',

    capabilities: {
        browserName: 'chrome'
    },

    jasmineNodeOpts: {
        // If true, print colors to the terminal.
        showColors: true,
        print: function() {}
    },

    onPrepare: function() {
        var jasmineReporters = require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmineReporters.TerminalReporter({
            color: true,
            verbosity: 3
        }));
    }
};