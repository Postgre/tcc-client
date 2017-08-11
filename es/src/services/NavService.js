module.exports = class NavService {
    constructor(config, storage = localStorage) {
        this.storage = storage;
        this.activity_map = config;
    }

    goto( activity, params ){
        if( "undefined" === typeof (this.activity_map[activity] ) ){
            alert("Bad navigation request: " + activity);
            return;
        }
        if( params ){
            this.storage.setItem("nav_params", JSON.stringify(params));
        }
        window.location = this.activity_map[activity];
    }

    getNavParam(name){
        let params = this.getNavParams();
        if( params ) return params[name];
    }
    getNavParams(){
        if( this.storage.nav_params ) return JSON.parse(this.storage.getItem('nav_params'));
    }
    resetNavParams(){
        delete this.storage.nav_params;
    }
};
