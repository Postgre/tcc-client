import $ from 'jquery';
import Site from 'Site';

const SELECTORS = [
    {
        role: "caroler",
        selector: ".cc-if-caroler"
    },
    {
        role: "customer",
        selector: ".cc-if-customer"
    },
    {
        role: "director",
        selector: ".cc-if-director"
    }
];

class MySite extends Site {
    processed(){
        super.processed();

        let role = "user";
        if(localStorage.role) role = localStorage.role;

        for( let i = 0; i < SELECTORS.length; i++ ){
            let s = SELECTORS[i].selector;
            $( s ).hide();
        }

        for( let i = 0; i < SELECTORS.length; i++ ){
            let definition = SELECTORS[i];
            let r = definition.role;
            let s = definition.selector;
            console.log( role, r, s );
            if( role === r ){
                $( s ).show();
            }
        }
    }
}

let instance = null;
function getInstance() {
    if (!instance) {
        instance = new MySite();
    }
    return instance;
}
function run() {
    let site = getInstance();
    site.run();
}
export default MySite;
export {
    MySite,
    run,
    getInstance
};