module.exports = class NavService {
    constructor(config) {
        console.info('NavService Loading...');
        this.activity_map = config.activity_map;
    }

    goto( activity, params ){
        if( "undefined" === typeof (this.activity_map[activity] ) ){
            alert("Bad navigation request: " + activity);
            return;
        }
        if( params ){
            localStorage.setItem("nav_params", JSON.stringify(params));
        }
        window.location = this.activity_map[activity]['path'];
    }

    static getNavParams(){
        if( localStorage.nav_params ) return JSON.parse(localStorage.getItem('nav_params'));
    }
    static resetNavParams(){
        delete localStorage.nav_params;
    }
};
