const $ = require('jQuery');

module.exports = class ApplicationService {
    constructor() {
        this.ifOperations = [];
        this.bindOperations = [];
    }

    renderSession(){
        this.ifOperations.forEach( function( operation ){
            var result = operation.condition();
            result ? $(operation.selector).show() : $(operation.selector).hide();
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