module.exports = class RoccoBuild {
    constructor(){
        this.operations = [];
        this.templates = {};
    }

    operate( file_path, operations ){
        let page = cheerio.load(fs.readFileSync(file_path, 'UTF-8'));
        for (let i = 0; i < operations.length; i++) {
            let op = operations[i];
            op(page);
        }
        fs.writeFileSync(file_path, page.html());
    }

    executeOperations( on_directory ){
        glob(on_directory+"*.html", function (er, files) {
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                this.operate( file, this.operations);
            }
        });
    }

    registerOperation( operation ){
        this.operations.push( operation );
    }

    registerTemplate( name, html ){
        this.templates.name = html;
    }

    tpl( name ){
        return this.templates[name];
    }
};