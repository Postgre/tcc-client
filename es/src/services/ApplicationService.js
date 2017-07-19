const $ = require('jQuery');

module.exports = class ApplicationService {
    constructor() {
        this.ifOperations = [];
        this.bindOperations = [];
    }

    renderSession(){
        this.ifOperations.forEach( function( operation ){ // hide them all
            $(operation.selector).hide();
        });
        this.ifOperations.forEach( function( operation ){
            var result = operation.condition();
            if(result) $(operation.selector).show();
        });
        this.bindOperations.forEach( function ( operation ) {
            $(operation.selector).html( operation.content() );
        })
    }

    registerIf( selector, func ){
        this.ifOperations.push({
            "selector": selector,
            "condition":    func
        })
    }
    registerBind( selector, func ){
        this.bindOperations.push({
            "selector": selector,
            "content": func
        })
    }
};