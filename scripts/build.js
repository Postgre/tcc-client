const replace = require("replace");
const fs = require('fs');
const glob = require("glob");
const cheerio = require('cheerio'); // https://github.com/cheeriojs/cheerio
const RoccoBuild = require('./RoccoBuild');

let roccoBuild = new RoccoBuild();

/**
 * Load Assets
 * ===================
 */
const header = fs.readFileSync('./partials/header.htm', 'UTF-8');
const footer = fs.readFileSync('./partials/footer.htm', 'UTF-8');

roccoBuild.registerOperation( function($){
    $('header').html(header);
});
roccoBuild.registerOperation( function($){
    $('footer').replaceWith(footer);
});

roccoBuild.executeOperations('./');