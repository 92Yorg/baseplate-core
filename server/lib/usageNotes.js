'use strict';

var fs = require('fs');
var showdown = require('showdown');

const converter = new showdown.Converter();

function contents(usage, useMarkdown) {
    return (useMarkdown) ? converter.makeHtml(usage) : usage;
}

module.exports = function (file, useMarkdown) {
    var usage;
    try {
        usage = fs.readFileSync(file, 'utf-8');
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err;
        }
    }
    return (usage) ? contents(usage, useMarkdown) : undefined;
};
