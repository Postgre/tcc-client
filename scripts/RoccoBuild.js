const fs = require('fs');
const glob = require("glob");
const cheerio = require('cheerio'); // https://github.com/cheeriojs/cheerio

module.exports = class RoccoBuild {
    constructor(){
        this.operations = [];
        this.templates = {};
    }

    // 1.)
    registerOperation( operation ){
        this.operations.push( operation );
    }
    // 2.)
    executeOperations( on_directory ){
        const self = this;
        glob(on_directory+"*.html", function (er, files) {
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                RoccoBuild.operate( file, self.operations);
            }
        });
    }

    static operate( file_path, operations ){
        let page = cheerio.load(fs.readFileSync(file_path, 'UTF-8'));
        for (let i = 0; i < operations.length; i++) {
            let op = operations[i];
            op(page);
        }
        fs.writeFileSync(file_path, page.html());
    }
};