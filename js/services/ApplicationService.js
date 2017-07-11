import $ from 'jquery';

var ifOperations = [];
var bindOperations = [];

function renderSession(){
    ifOperations.forEach( function( operation ){
        var result = operation.condition();
        result ? $(operation.selector).show() : $(operation.selector).hide();
    });
    bindOperations.forEach( function ( operation ) {
        $(operation.selector).html( operation.content() );
    })
}
function registerIf( selector, func ){
    ifOperations.push({
        "selector": selector,
        "condition":    func
    })
}
function registerBind( selector, func ){
    bindOperations.push({
        "selector": selector,
        "content": func
    })
}

export {
    ifOperations,
    bindOperations,
    registerBind,
    registerIf,
    renderSession
}