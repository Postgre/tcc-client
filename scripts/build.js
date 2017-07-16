const fs = require('fs');
const glob = require("glob");
const cheerio = require('cheerio'); // https://github.com/cheeriojs/cheerio

// Load library
const RoccoBuild = require('./RoccoBuild');
let roccoBuild = new RoccoBuild();

// Load static assets/templates
const header = fs.readFileSync('./partials/header.htm', 'UTF-8');
const footer = fs.readFileSync('./partials/footer.htm', 'UTF-8');

// Define the sync operations
roccoBuild.registerOperation( function($){
    $('header').html(header);
});
roccoBuild.registerOperation( function($){
    $('footer').replaceWith(footer);
});
roccoBuild.registerOperation( function($){
    $('angular').replaceWith(`<!-- Angular
    ============================================= -->
    <script src="node_modules/angular/angular.min.js"></script>`)
});
// Execute them on the project root
roccoBuild.executeOperations('./');